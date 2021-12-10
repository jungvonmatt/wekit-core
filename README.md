# contentful-hugo-core

[Hugo](https://gohugo.io/) templates and utilities that support [Contentful](https://www.contentful.com/) and/or [Storybook](https://storybook.js.org/) projects.

- [contentful-hugo-core](#contentful-hugo-core)
  - [Utils](#utils)
    - [asset](#asset)
    - [console/dump](#consoledump)
    - [console/error](#consoleerror)
    - [console/warn](#consolewarn)
    - [dump](#dump)
    - [get-category-name](#get-category-name)
    - [get-data](#get-data)
    - [get-page](#get-page)
    - [get-params](#get-params)
    - [get-partial](#get-partial)
    - [get-settings](#get-settings)
    - [html/attribute](#htmlattribute)
    - [link](#link)
    - [not-found](#not-found)
    - [reflect/is-string](#reflectis-string)
    - [rich-text/rich-text](#rich-textrich-text)
  - [Layouts](#layouts)
    - [storybook](#storybook)
    - [robots.txt](#robotstxt)
  - [Credits](#credits)

## Utils

### asset

Render Contentful asset. Uses data from [cssg-plugin-assets](https://github.com/jungvonmatt/contentful-ssg/tree/main/packages/cssg-plugin-assets) if available.

*Template*

```
{{ partial "utils/asset" (dict
  "globals" $globals
  "context" $image
  "options" (dict
    "sizes" "(max-width: 768px) 100vw, 768px"
  )
) }}
```

### console/dump

Emits a warning message with information on variables.

*Template*

```
{{ partial "utils/console/dump" $message }}
```

### console/error

Emits an error message.

*Template*

```
{{ partial "utils/console/error" $message }}
```

### console/warn

Emits a warning message.

*Template*

```
{{ partial "utils/console/warn" $message }}
```

### dump

Dump variable as highlighted yaml.

*Template*

```
{{ partial "utils/dump" .context }}
```

### get-category-name

Get category name by prefix of `content_type`.

*Template*

```
{{ partial "utils/get-category-name" (dict "content_type" $content_type) }}
```

### get-data

Get data from Contentful data types.

*Template*

```
{{ partial "utils/get-data" (dict
  "globals" $globals
  "context" (dict
    "id" "ENTRY_ID"
    "content_type"
    "CONTENT_TYPE_ID"
  )
) }}
```

### get-page

Get linked page document for `content_type` and `id`. Get data from Contentful data types.

*Template*

```
{{ partial "utils/get-page" (dict
  "id" "ENTRY_ID"
  "content_type" "CONTENT_TYPE_ID"
) }}
```

### get-params

Get params from linked page.

*Template*

```
{{ partial "utils/get-params" (dict
  "id" "ENTRY_ID"
  "content_type" "CONTENT_TYPE_ID"
) }}
```

### get-partial

Calls partial connected with linked content type with .Params from from linked page. Get params from linked page.

*Template*

```
{{ partial "utils/get-partial" (dict
  "globals" $globals
  "context" (dict
    "id" "ENTRY_ID"
    "content_type" "CONTENT_TYPE_ID"
  )
  "options" (dict "key" "param overwrite")
) }}
```

### get-settings

Get Contentful settings (`d-settings`).

*Template*

```
{{ partial "utils/get-settings" }}
```

### html/attribute

Render HTML attributes.

*Template*

```
{{ $attr := partialCached "utils/html/attribute" (dict
  "key" "value"
  "data" (dict "index" 2)
  "disabled" true
) }}
```

*Output*

```
key="value" data-index="2" disabled
```

### link

Get link attributes from context.

*Template*

```
{{ partial "utils/link" .context }}
```

### not-found

Render a not-found warning.

*Template*

```
{{ partial "utils/not-found" (dict "name" $file_path) }}
```

### reflect/is-string

Check if passed value is of type "string".

*Template*

```
{{ if partialCached "reflect/is-string" $value $value }}
  We have a string!
{{ end }}
```

### rich-text/rich-text

A rich text field in Contentful consists of nested arrays. The util loops over each node and generates the corresponding HTML depending on the nodeType. See `utils/rich-text/blocks` for supported types.

## Layouts

### storybook

A set of layouts that support the generation of Storybook files.

*Example output*

```
./public/
└── stories/<contentType>/
    └── <variation>/
    │   └── canvas.stories.js
    └── docs.stories.mdx
```

### robots.txt

Generate a customized robots.txt.

*Template*

```
User-agent: *
{{ if eq (hugo.Environment) "production" -}}
Allow: /
{{ else -}}
Disallow: /
{{ end }}
Sitemap: {{ "sitemap.xml" | absURL -}}
```

## Credits

Many thanks to [regisphilibert](https://github.com/regisphilibert) for his outstanding support in the Hugo community and the inspiring work on the Hugo framework [Huge](https://github.com/theNewDynamic/huge).
