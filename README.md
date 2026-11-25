# Cariocas F.C. — sitio web

Sitio estático de **Cariocas Funcional Effect**: fútbol y entrenamiento funcional para adultos en El Pueblito, Corregidora, Querétaro.

HTML + CSS + JavaScript sin dependencias ni paso de compilación. Se publica tal cual en GitHub Pages.

## Editar datos (teléfono, horarios, redes)
Todo está en **`js/config.js`**:

| Campo | Qué es |
|---|---|
| `whatsapp` | Número con código de país, p. ej. `524421234567` (**pendiente**) |
| `mensaje` | Texto que aparece escrito al abrir WhatsApp |
| `precioPrimeraClase` | Precio de la clase de prueba |
| `googleReseñas`, `googleMaps`, `instagram`, `facebook`, `tiktok` | Enlaces; si se dejan vacíos, el botón se oculta |
| `horarios` | Lista de `{ dias, hora, grupo }`; si está vacía se muestra "Horarios por WhatsApp" |

## Entrenador auxiliar
En `index.html` busca `Emmanuel Lucario`: hay un comentario que explica cómo poner su foto y descripción.

## Estructura
```
index.html          página
css/styles.css      estilos (paleta oficial en :root)
js/config.js        datos editables
js/main.js          animaciones, botón flotante, videos, galería
assets/fotos, logo, videos   originales
assets/opt/         versiones optimizadas (WebP, videos comprimidos, posters, ícono, imagen para redes)
```

## Regenerar imágenes optimizadas
```bash
for f in assets/fotos/*.jpg; do n=$(basename $f .jpg)
  convert $f -strip -resize '700x>'  -quality 72 assets/opt/$n-700.webp
  convert $f -strip -resize '1400x>' -quality 70 assets/opt/$n-1400.webp
done
```
