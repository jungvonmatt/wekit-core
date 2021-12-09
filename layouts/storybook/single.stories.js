{{- define "main" -}}
{{- $parts := split .Page.SectionsPath "/" -}}
{{- $content_type := index (last 1 $parts) 0 -}}
{{- $category := partial "utils/get-category-name" (dict "content_type" $content_type) -}}
{{- $path := print $category "/" $content_type "/Examples"  -}}


import '@public/css/main.css';

export default {
  title: '{{- $path -}}',
  parameters: {
    viewMode: 'canvas',
  },
};

export const {{ replace (.File.ContentBaseName | title) "-" "" }} = () => `
{{- range .Params.partials -}}
{{- partial "utils/get-partial" (dict
  "context" .
  "globals" $
) -}}
{{- end -}}
`;
{{- end -}}
