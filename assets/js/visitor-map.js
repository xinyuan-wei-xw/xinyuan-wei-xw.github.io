(function () {
  'use strict';
  var root = new URL('../../', document.currentScript.src);
  var canvas = document.getElementById('visitor-map-canvas');
  var countrySelect = document.getElementById('map-country');
  var regionSelect = document.getElementById('map-region');
  var citySelect = document.getElementById('map-city');
  var status = document.getElementById('visitor-status');
  var note = document.getElementById('visitor-location-note');
  var data = {countries: [], regions: [], cities: []}, regions = [], svg, stateLayer, cityLayer, uniLayer;
  var box = [0, 0, 900, 506.25], country = '', region = '', city = '';
  var ns = 'http://www.w3.org/2000/svg', dragged = false;
  function norm(s) { return (s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function label(s) { return s === '(not set)' ? 'Location unavailable' : s; }
  function option(select, value, text) { var o = document.createElement('option'); o.value = value; o.textContent = text; select.appendChild(o); }
  function clear(select, text) { select.replaceChildren(); option(select, '', text); }
  function setBox(value) {
    box = value;
    svg.setAttribute('viewBox', box.join(' '));
    var base = Math.max(0.06, box[2] * 0.006);
    cityLayer.querySelectorAll('circle').forEach(function (p) { p.setAttribute('r', base); });
    if (uniLayer) uniLayer.querySelectorAll('circle').forEach(function (p) {
      var n = parseInt(p.dataset.visits || '0', 10);
      p.setAttribute('r', (base * 1.6 * (1 + 0.35 * Math.log1p(n))).toFixed(3));
    });
  }
  function fit(elements) {
    var boxes = elements.map(function (e) { return e.getBBox(); }).filter(function (b) { return b.width || b.height; });
    if (!boxes.length) return false;
    var x = Math.min.apply(null, boxes.map(function (b) { return b.x; }));
    var y = Math.min.apply(null, boxes.map(function (b) { return b.y; }));
    var xmax = Math.max.apply(null, boxes.map(function (b) { return b.x + b.width; }));
    var ymax = Math.max.apply(null, boxes.map(function (b) { return b.y + b.height; }));
    var w = Math.max(8, (xmax - x) * 1.15), h = Math.max(4.5, (ymax - y) * 1.15);
    w = Math.max(w, h * 16 / 9); h = w * 9 / 16;
    setBox([(x+xmax-w)/2, (y+ymax-h)/2, w, h]);
    return true;
  }
  function color(n, max) {
    if (!n) return '#c5d8ed';
    var colors = ['#acc5e8', '#7ca3d4', '#4679bd', '#245aa8', '#0039a6'];
    return colors[Math.min(4, Math.floor(4*Math.log1p(n)/Math.log1p(max || 1)))];
  }
  function shapeMatch(shape, name) { return shape.aliases.some(function (a) { return norm(a) === norm(name); }); }
  function table() {
    var rows, heading;
    if (!country) {
      heading = 'Country / region'; rows = data.countries.map(function (r) { return {name:r.name, n:r.sessions, choose:function(){chooseCountry(r.code);}}; });
    } else if (!region) {
      heading = 'State / province'; rows = data.regions.filter(function (r) { return r.country === country; }).map(function (r) { return {name:r.region,n:r.sessions,choose:function(){chooseRegion(r.region);}}; });
    } else {
      heading = 'City'; rows = data.cities.filter(function (r) { return r.country === country && r.region === region; }).map(function (r) { return {name:r.city,n:r.sessions,choose:function(){chooseCity(r.city);}}; });
    }
    document.getElementById('visitor-table-title').textContent = 'Visits by ' + heading.toLowerCase();
    document.getElementById('visitor-table-place').textContent = heading;
    var body = document.getElementById('visitor-table-body'); body.replaceChildren();
    rows.forEach(function (r) {
      var tr=document.createElement('tr'), th=document.createElement('th'), td=document.createElement('td'), button=document.createElement('button');
      th.scope='row';button.type='button';button.className='visitor-place-link';button.textContent=label(r.name);button.addEventListener('click',r.choose);
      th.appendChild(button);td.textContent=r.n.toLocaleString();tr.append(th,td);body.appendChild(tr);
    });
    document.getElementById('visitor-table-wrap').hidden = !rows.length;
  }
  function drawStates() {
    stateLayer.replaceChildren();cityLayer.replaceChildren();
    var records=data.regions.filter(function(r){return r.country===country;});
    var max=Math.max.apply(null, records.map(function(r){return r.sessions;}).concat([1]));
    regions.filter(function(r){return r.country===country;}).forEach(function(shape){
      var record=records.find(function(r){return shapeMatch(shape,r.region);});
      var p=document.createElementNS(ns,'path');p.setAttribute('d',shape.path);p.setAttribute('fill',color(record ? record.sessions : 0,max));p.setAttribute('stroke','#fff');p.setAttribute('stroke-width','0.7');p.setAttribute('vector-effect','non-scaling-stroke');
      p.dataset.region=record ? record.region : shape.name;
      var title=document.createElementNS(ns,'title');title.textContent=shape.name+(record ? ': '+record.sessions+' sessions' : ': no reported visits');p.appendChild(title);
      p.addEventListener('click',function(){if(!dragged)chooseRegion(p.dataset.region);});stateLayer.appendChild(p);
    });
  }
  function chooseCountry(code) {
    country=code;region='';city='';countrySelect.value=code;note.textContent='';
    clear(regionSelect,'All states / provinces');clear(citySelect,'All cities');citySelect.disabled=true;
    var names=new Set();
    data.regions.filter(function(r){return r.country===country;}).forEach(function(r){names.add(r.region);});
    regions.filter(function(r){return r.country===country;}).forEach(function(shape){if(!Array.from(names).some(function(n){return shapeMatch(shape,n);}))names.add(shape.name);});
    Array.from(names).sort().forEach(function(n){option(regionSelect,n,label(n));});regionSelect.disabled=!code;
    drawStates();
    if (!code) setBox([0,0,900,506.25]);
    else if(!fit(Array.from(svg.querySelectorAll('path[data-country]')).filter(function(p){return p.dataset.country===code;}))) {
      setBox([0,0,900,506.25]);note.textContent='Map outline unavailable for this location; available counts are listed below.';
    }
    table();
  }
  function chooseRegion(name) {
    if(!name){chooseCountry(country);return;}
    region=name;city='';regionSelect.value=name;note.textContent='';clear(citySelect,'All cities');
    var records=data.cities.filter(function(r){return r.country===country&&r.region===region;});
    records.forEach(function(r){option(citySelect,r.city,label(r.city));});citySelect.disabled=!records.length;
    cityLayer.replaceChildren();
    records.forEach(function(r){
      if(!r.location)return;
      var dot=document.createElementNS(ns,'circle');dot.setAttribute('cx',(r.location.longitude+180)*2.5);dot.setAttribute('cy',(85-r.location.latitude)*2.5+25);dot.setAttribute('r','0.2');dot.setAttribute('fill','#0039a6');dot.setAttribute('stroke','#fff');dot.setAttribute('stroke-width','1');dot.setAttribute('vector-effect','non-scaling-stroke');dot.dataset.city=r.city;
      var title=document.createElementNS(ns,'title');title.textContent=r.city+': '+r.sessions+' sessions';dot.appendChild(title);dot.addEventListener('click',function(){if(!dragged)chooseCity(r.city);});cityLayer.appendChild(dot);
    });
    var shapes=Array.from(stateLayer.children).filter(function(p){return norm(p.dataset.region)===norm(region);});
    if(!fit(shapes)){note.textContent='State/province outline unavailable; counts are listed below.';}
    if(records.some(function(r){return !r.location;}))note.textContent+=' Some cities have counts but no matched map coordinates.';
    table();
  }
  function chooseCity(name) {
    if(!name){chooseRegion(region);return;}
    city=name;citySelect.value=name;
    var r=data.cities.find(function(r){return r.country===country&&r.region===region&&r.city===city;});
    if(r&&r.location){var x=(r.location.longitude+180)*2.5,y=(85-r.location.latitude)*2.5+25;setBox([x-6,y-3.375,12,6.75]);note.textContent=r.city+' · '+r.sessions+' visits. Marker indicates the city center, not a visitor address.';}
    else {note.textContent=label(name)+' has reported visits, but no matched map coordinates are available.';}
  }
  function zoom(factor) {
    if(!svg)return;
    var width=Math.max(2,Math.min(900,box[2]*factor)),height=width*9/16;
    setBox([box[0]+(box[2]-width)/2,box[1]+(box[3]-height)/2,width,height]);
  }
  document.getElementById('map-in').addEventListener('click',function(){zoom(0.7);});
  document.getElementById('map-out').disabled=false;
  document.getElementById('map-out').addEventListener('click',function(){zoom(1/0.7);});
  document.getElementById('map-reset').addEventListener('click',function(){if(svg)chooseCountry('');});
  countrySelect.addEventListener('change',function(){chooseCountry(this.value);});
  regionSelect.addEventListener('change',function(){chooseRegion(this.value);});
  citySelect.addEventListener('change',function(){chooseCity(this.value);});
  var uniData = [], uniCounts = {}, uniOn = true;
  function uniXY(lat, lng) { return [(lng + 180) * 2.5, (85 - lat) * 2.5 + 25]; }
  function uniTitle(u) {
    var n = uniCounts[u.slug] || 0;
    return u.name + (n ? ' \u00b7 ' + n.toLocaleString() + ' university visit' + (n === 1 ? '' : 's') : ' \u00b7 no university visits recorded yet');
  }
  function drawUniversities() {
    if (!uniLayer) return;
    uniLayer.replaceChildren();
    if (!uniOn) return;
    uniData.forEach(function (u) {
      var xy = uniXY(u.lat, u.lng);
      var dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', xy[0].toFixed(2)); dot.setAttribute('cy', xy[1].toFixed(2));
      dot.setAttribute('fill', '#e8a020'); dot.setAttribute('stroke', '#fff');
      dot.setAttribute('stroke-width', '1'); dot.setAttribute('vector-effect', 'non-scaling-stroke');
      dot.dataset.visits = uniCounts[u.slug] || 0;
      var title = document.createElementNS(ns, 'title'); title.textContent = uniTitle(u); dot.appendChild(title);
      dot.addEventListener('click', function () { if (!dragged) setBox([xy[0] - 6, xy[1] - 3.375, 12, 6.75]); });
      uniLayer.appendChild(dot);
    });
    setBox(box);
  }
  function loadUniCounts() {
    return load('assets/js/visit-log.js', 'text').then(function (t) {
      var m = t.match(/[?&]key=([A-Za-z0-9_\-]{20,})/);
      if (!m) throw new Error('no key');
      return fetch('https://firestore.googleapis.com/v1/projects/x-planner-99dd3/databases/(default)/documents/uni_visits?pageSize=400&key=' + m[1], {cache: 'no-store'});
    }).then(function (r) { if (!r.ok) throw new Error('counts failed'); return r.json(); }).then(function (j) {
      var counts = {};
      (j.documents || []).forEach(function (d) {
        var slug = d.name.split('/').pop();
        var v = d.fields && d.fields.visits;
        counts[slug] = v ? parseInt(v.integerValue || '0', 10) : 0;
      });
      return counts;
    }).catch(function () { return {}; });
  }
  function initUniversities() {
    var toolbar = document.querySelector('.visitor-toolbar');
    if (toolbar && !document.getElementById('map-universities')) {
      var lab = document.createElement('label'); lab.className = 'visitor-uni-toggle';
      lab.title = 'Show Carnegie R1/R2 universities. Gold markers are matched by visitor network (aggregate counts only; no IP addresses or individual visits are shown).';
      var chk = document.createElement('input'); chk.type = 'checkbox'; chk.id = 'map-universities'; chk.checked = true;
      chk.addEventListener('change', function () { uniOn = chk.checked; drawUniversities(); });
      lab.appendChild(chk); lab.appendChild(document.createTextNode(' Universities'));
      toolbar.appendChild(lab);
      var legend = document.createElement('span'); legend.className = 'visitor-legend';
      legend.innerHTML = '<svg width="10" height="10" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="#0039a6"/></svg> City visits (GA4) <svg width="10" height="10" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="#e8a020"/></svg> University (network)';
      toolbar.appendChild(legend);
      var priv = document.querySelector('p.visitor-note:not([id])');
      if (priv) priv.textContent += ' Gold markers show Carnegie R1/R2 universities matched by visitor network; counts are aggregate only.';
    }
    Promise.all([load('assets/data/universities.json', 'json'), loadUniCounts()]).then(function (res) {
      uniData = res[0] || []; uniCounts = res[1] || {};
      drawUniversities();
    }).catch(function () { /* markers stay hidden if data fails to load */ });
  }
  function load(path,type){return fetch(new URL(path,root),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('Load failed');return type==='text'?r.text():r.json();});}
  Promise.all([load('assets/data/visitor-map.json'),load('assets/data/map-regions.json'),load('images/lab/visitor-map.svg','text')]).then(function(results){
    data=results[0];data.countries=data.countries||[];data.regions=data.regions||[];data.cities=data.cities||[];regions=results[1];
    svg=new DOMParser().parseFromString(results[2],'image/svg+xml').documentElement;
    if(svg.localName!=='svg')throw new Error('Invalid map');
    var caption=svg.querySelector('#map-caption');if(caption)caption.remove();
    svg.querySelectorAll('path').forEach(function(p){p.setAttribute('vector-effect','non-scaling-stroke');p.addEventListener('click',function(){if(!dragged)chooseCountry(p.dataset.country);});});
    stateLayer=document.createElementNS(ns,'g');cityLayer=document.createElementNS(ns,'g');uniLayer=document.createElementNS(ns,'g');svg.append(stateLayer,cityLayer,uniLayer);canvas.replaceChildren(svg);
    var names=new Map();svg.querySelectorAll('path[data-country]').forEach(function(p){if(/^[A-Z]{2}$/.test(p.dataset.country))names.set(p.dataset.country,p.dataset.name);});
    data.countries.forEach(function(c){names.set(c.code,c.name);});Array.from(names).sort(function(a,b){return a[1].localeCompare(b[1]);}).forEach(function(a){option(countrySelect,a[0],label(a[1]));});
    if(data.status==='ready'){
      document.getElementById('visitor-total').textContent=data.total_sessions.toLocaleString();
      document.getElementById('visitor-countries').textContent=data.countries.filter(function(c){return /^[A-Z]{2}$/.test(c.code);}).length;
      status.textContent=data.start_date+' – '+data.end_date+' ('+data.timezone+') · Updated '+new Date(data.updated_at).toLocaleString();
      if(!data.total_sessions)status.textContent+=' · No visits reported for this period yet.';
      if(data.thresholded)status.textContent+=' · Some results are withheld by Google Analytics.';
    }
    chooseCountry('');
    initUniversities();
    var start;
    svg.addEventListener('pointerdown',function(e){if(e.button!==0)return;dragged=false;start={x:e.clientX,y:e.clientY,box:box.slice()};});
    svg.addEventListener('pointermove',function(e){if(!start)return;var dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)+Math.abs(dy)>5){dragged=true;svg.setPointerCapture(e.pointerId);var scale=start.box[2]/svg.getBoundingClientRect().width;setBox([start.box[0]-dx*scale,start.box[1]-dy*scale,start.box[2],start.box[3]]);}});
    svg.addEventListener('pointerup',function(){start=null;});svg.addEventListener('pointercancel',function(){start=null;});
    svg.addEventListener('pointerleave',function(){start=null;});
  }).catch(function(){status.textContent='Map data is temporarily unavailable. Please try again later.';});
}());
