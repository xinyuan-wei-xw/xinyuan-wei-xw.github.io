---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

Publications
======
- Peng, L., Wei, X., & Yao, V. (2022). Statistical Analysis of Home-Sharing Effect. Available at SSRN 4034848.

- Wei, X., Yu, B., & Liu, Y. (2020). Accessing Information Asymmetry in Peer-to-Peer Lending by Default Prediction from Investors’ Perspective. *Symmetry*, *12*(6), 935.

- Wang, G., Wei, X., Yu, B., & Xu, L. (2020). An efficient proximal block coordinate homotopy method for large-scale sparse least squares problems. *SIAM Journal on Scientific Computing*, *42*(1), A395-A423.

- Wei, X., Gotoh, J. Y., & Uryasev, S. (2018). Peer-to-peer lending: classification in the loan application process. *Risks*, *6*(4), 129.


{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
