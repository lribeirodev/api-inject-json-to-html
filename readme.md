# API INJECT JSON TO HTML

<h4>
MODOS DE USO
</h4>

A injeção de dados json para html é feita em etapas, neste primeiro exemplo utilizaremos uma propriedade simples, como nome, em uma estrutura de dados json

```json
{
    "nome": "lucas ribeiro"
}
```

após definido a nossa propriedade json, vamos ao próximo passo que é a estruturação disso em um html

```html
<html>
    <header></header>
    <body>
        <div class="resume">
            <div class="resume__nome" property="nome"></div>
        </div>
    </body>
</html>
```

Após a inicialização da API, os dados serão injetados nas propriedades equivalentes, json --> html, outros exemplos podem ser vistos no resume.html 

<h4>Propriedades Conhecidas</h4>
<ul>
    <li>property</li>
    <li>child</li>
    <li>container</li>
    <li>array-property</li>
</ul>

<h4>Limitações</h4>
<ul>
    <li>Após a propriedade array-property é necessario declarar um container</li>
    <li>Array são lidos apenas no primeiro nível</li>
</ul>


LIVE EXAMPLE:
<a href="https://lribeirodev.github.io/api-inject-json-to-html/resume.html">CLIQUE AQUI / CLICK HERE</a>