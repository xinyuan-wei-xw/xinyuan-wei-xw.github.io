---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

Publications
======
- Peng, L., Wei, X., & Yao, V. (2022). [Statistical Analysis of Home-Sharing Effect](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4034848). Available at SSRN 4034848.

- Wei, X., Yu, B., & Liu, Y. (2020). [Accessing Information Asymmetry in Peer-to-Peer Lending by Default Prediction from Investors’ Perspective](https://www.mdpi.com/2073-8994/12/6/935). *Symmetry*, *12*(6), 935.

- Wang, G., Wei, X., Yu, B., & Xu, L. (2020). [An efficient proximal block coordinate homotopy method for large-scale sparse least squares problems](https://epubs.siam.org/doi/abs/10.1137/19M1243828). *SIAM Journal on Scientific Computing*, *42*(1), A395-A423.

- Wei, X., Gotoh, J. Y., & Uryasev, S. (2018). [Peer-to-peer lending: classification in the loan application process](https://www.mdpi.com/2227-9091/6/4/129). *Risks*, *6*(4), 129. Data and code files are available at [https://www.ise.ufl.edu/uryasev/research/testproblems/financial_engineering/%20classification-in-loan-application-process%20/](https://www.ise.ufl.edu/uryasev/research/testproblems/financial_engineering/%20classification-in-loan-application-process%20/)


{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
