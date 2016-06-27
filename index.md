---
layout: archive
author_profile: true
---

{% include base_path %}

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts }}</h3>

{% capture current_year %}{{ site.time | date: '%y' }}{% endcapture %}

{% for post in site.posts limit:10 %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year == current_year %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
