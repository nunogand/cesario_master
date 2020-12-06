---
layout: home
pagination: 
  enabled: true
---
{% for post in paginator.posts %}
{% assign length = site.posts.size %}
{% assign lengthID = site.posts.size | plus: 1%}

  <div id="js-{{ forloop.index }}" class="post -fixed{% if forloop.index == 1 %} -first{% endif %}{% if forloop.index == length %} -last{% endif %}">
    <span id="{{ post.url | remove: '/' }}">
      
      <div class="post-header ctnr-golden">
        <h1 class="post-title">
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
        </h1>
      </div>
    
    </span>
    <img class="post-image" style="z-index: {{ lengthID | minus: forloop.index }}" src="{{ site.baseurl }}{{ site.assets }}/posts/{{post.image}}.jpg">
    <div class="ctnr-wide">
    {{ post.content }}
    </div>
  </div>
{% endfor %}
{%comment%}
{% if paginator.total_pages > 1 %}
<ul style="margin: auto; width: 60%; border: 5px solid #FFFF00; padding: 10px;">
  {% if paginator.previous_page %}
  <li>
    <a href="{{ paginator.previous_page_path | prepend: site.baseurl }}">Newer</a>
  </li>
  {% endif %}
  {% if paginator.next_page %}
  <li>
    <a href="{{ paginator.next_page_path | prepend: site.baseurl }}">Older</a>
  </li>
  {% endif %}
</ul>
{% endif %}
{%endcomment%}