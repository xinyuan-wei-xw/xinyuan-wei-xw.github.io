(function () {
  'use strict';
  var root = new URL('../../', document.currentScript.src);
  var canvas = document.getElementById('visitor-map-canvas');
  var countrySelect = document.getElementById('map-country');
  var regionSelect = document.getElementById('map-region');
  var citySelect = document.getElementById('map-city');
  var status = document.getElementById('visitor-status');
  var note = document.getElementById('visitor-location-note');
  var data = {countries: [], regions: [], cities: []}, regions = [], svg, stateLayer, cityLayer;
  var box = [0, 0, 900, 506.25], country = '', region = '', city = '';
  var ns = 'http://www.w3.org/2000/svg', dragged = false;
  function norm(s) { return (s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function label(s) { return s === '(not set)' ? 'Location unavailable' : s; }
  function option(select, value, text) { var o = document.createElement('option'); o.value = value; o.textContent = text; select.appendChild(o); }
  function clear(select, text) { select.replaceChildren(); option(select, '', text); }
  function setBox(value) {
    box = value;
    svg.setAttribute('viewBox', box.join(' '));
    cityLayer.querySelectorAll('circle').forEach(function (p) { p.setAttribute('r', Math.max(0.06, box[2] * 0.006)); });
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
    refreshUniversityTable();
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
    refreshUniversityTable();
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

  // --- University visit counts (logged by visit-log.js) ---
  // The table is shown only on the state page, listing visited universities in that state.
  var uniData = [], uniCounts = {}, uniWrap = null, uniContent = null, uniReady = false;
  var US_STATE_CODES = {alabama:'AL',alaska:'AK',arizona:'AZ',arkansas:'AR',california:'CA',colorado:'CO',connecticut:'CT',delaware:'DE',districtofcolumbia:'DC',florida:'FL',georgia:'GA',hawaii:'HI',idaho:'ID',illinois:'IL',indiana:'IN',iowa:'IA',kansas:'KS',kentucky:'KY',louisiana:'LA',maine:'ME',maryland:'MD',massachusetts:'MA',michigan:'MI',minnesota:'MN',mississippi:'MS',missouri:'MO',montana:'MT',nebraska:'NE',nevada:'NV',newhampshire:'NH',newjersey:'NJ',newmexico:'NM',newyork:'NY',northcarolina:'NC',northdakota:'ND',ohio:'OH',oklahoma:'OK',oregon:'OR',pennsylvania:'PA',puertorico:'PR',rhodeisland:'RI',southcarolina:'SC',southdakota:'SD',tennessee:'TN',texas:'TX',utah:'UT',vermont:'VT',virginia:'VA',washington:'WA',westvirginia:'WV',wisconsin:'WI',wyoming:'WY'};
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
    }).catch(function () { return null; });
  }
  function initUniversityTable() {
    var anchor = document.getElementById('visitor-table-wrap');
    if (!anchor || uniWrap) return;
    uniWrap = document.createElement('div'); uniWrap.id = 'visitor-uni-wrap'; uniWrap.hidden = true;
    var h = document.createElement('h2'); h.textContent = 'Universities near visitors'; uniWrap.appendChild(h);
    var note = document.createElement('p'); note.className = 'visitor-note';
    note.textContent = 'Matched by visitor network, or by approximate location (within 35 miles) when the network does not match a university. IP addresses are not shown or stored; counts update live.';
    uniWrap.appendChild(note);
    uniContent = document.createElement('div'); uniWrap.appendChild(uniContent);
    var loading = document.createElement('p'); loading.className = 'visitor-note'; loading.textContent = 'Loading university visits…';
    uniContent.appendChild(loading);
    anchor.after(uniWrap);
    Promise.all([load('assets/data/universities.json', 'json'), loadUniCounts()]).then(function (res) {
      uniData = res[0] || []; uniCounts = res[1]; uniReady = true;
      refreshUniversityTable();
    }).catch(function () {
      uniData = []; uniCounts = null; uniReady = true;
      refreshUniversityTable();
    });
  }
  function refreshUniversityTable() {
    if (!uniWrap || !uniReady) return;
    uniContent.replaceChildren();
    if (!region) { uniWrap.hidden = true; return; }
    uniWrap.hidden = false;
    if (uniCounts === null) {
      var err = document.createElement('p'); err.className = 'visitor-note';
      err.textContent = 'University visit data is temporarily unavailable.';
      uniContent.appendChild(err); return;
    }
    var code = US_STATE_CODES[norm(region)];
    var visited = uniData.filter(function (u) { return code && u.state === code && (uniCounts[u.slug] || 0) > 0; });
    if (!visited.length) {
      var none = document.createElement('p'); none.className = 'visitor-note';
      none.textContent = 'No university visits recorded yet.';
      uniContent.appendChild(none); return;
    }
    var byCity = {};
    visited.forEach(function (u) {
      var key = (u.city || '') + '||' + (u.state || '');
      (byCity[key] = byCity[key] || []).push(u);
    });
    var cities = Object.keys(byCity).sort();
    var table = document.createElement('table'); table.className = 'visitor-table';
    table.innerHTML = '<thead><tr><th scope="col">University</th><th scope="col">Visits</th></tr></thead>';
    var tbody = document.createElement('tbody');
    var total = 0;
    cities.forEach(function (key) {
      var parts = key.split('||');
      var list = byCity[key].sort(function (a, b) {
        return ((uniCounts[b.slug] || 0) - (uniCounts[a.slug] || 0)) || a.name.localeCompare(b.name);
      });
      var ctr = document.createElement('tr'); ctr.className = 'visitor-uni-city';
      var cth = document.createElement('th'); cth.colSpan = 2; cth.scope = 'rowgroup';
      cth.textContent = parts[0] + (parts[1] ? ', ' + parts[1] : '');
      ctr.appendChild(cth); tbody.appendChild(ctr);
      list.forEach(function (u) {
        var n = uniCounts[u.slug] || 0; total += n;
        var tr = document.createElement('tr');
        var th = document.createElement('th'); th.scope = 'row'; th.textContent = u.name;
        var td = document.createElement('td'); td.textContent = n.toLocaleString();
        tr.appendChild(th); tr.appendChild(td); tbody.appendChild(tr);
      });
    });
    table.appendChild(tbody);
    uniContent.appendChild(table);
    var sum = document.createElement('p'); sum.className = 'visitor-note';
    sum.textContent = total.toLocaleString() + ' visits · ' + visited.length +
      (visited.length === 1 ? ' university' : ' universities') + '.';
    uniContent.appendChild(sum);
  }
  function load(path,type){return fetch(new URL(path,root),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('Load failed');return type==='text'?r.text():r.json();});}
  Promise.all([load('assets/data/visitor-map.json'),load('assets/data/map-regions.json'),load('images/lab/visitor-map.svg','text')]).then(function(results){
    data=results[0];data.countries=data.countries||[];data.regions=data.regions||[];data.cities=data.cities||[];regions=results[1];
    svg=new DOMParser().parseFromString(results[2],'image/svg+xml').documentElement;
    if(svg.localName!=='svg')throw new Error('Invalid map');
    var caption=svg.querySelector('#map-caption');if(caption)caption.remove();
    svg.querySelectorAll('path').forEach(function(p){p.setAttribute('vector-effect','non-scaling-stroke');p.addEventListener('click',function(){if(!dragged)chooseCountry(p.dataset.country);});});
    stateLayer=document.createElementNS(ns,'g');cityLayer=document.createElementNS(ns,'g');svg.append(stateLayer,cityLayer);canvas.replaceChildren(svg);
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
    initUniversityTable();
    var start;
    svg.addEventListener('pointerdown',function(e){if(e.button!==0)return;dragged=false;start={x:e.clientX,y:e.clientY,box:box.slice()};});
    svg.addEventListener('pointermove',function(e){if(!start)return;var dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)+Math.abs(dy)>5){dragged=true;svg.setPointerCapture(e.pointerId);var scale=start.box[2]/svg.getBoundingClientRect().width;setBox([start.box[0]-dx*scale,start.box[1]-dy*scale,start.box[2],start.box[3]]);}});
    svg.addEventListener('pointerup',function(){start=null;});svg.addEventListener('pointercancel',function(){start=null;});
    svg.addEventListener('pointerleave',function(){start=null;});
  }).catch(function(){status.textContent='Map data is temporarily unavailable. Please try again later.';});
}());
