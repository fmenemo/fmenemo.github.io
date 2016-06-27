---
layout: archive
author_profile: true
---

{% include base_path %}

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts }}</h3>

{% capture current_year %}{{ site.time | date: '%Y' }}{% endcapture %}

<h3 class="archive__subtitle">{% current_year %}</h3>

{% for post in site.posts %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  <h3 class="archive__subtitle">{% year %}</h3>
  {% if year == current_year %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
