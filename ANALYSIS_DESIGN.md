# Análisis y Diseño para MCP Read JSON

## Análisis de las Herramientas Existentes

El servidor memory original implementa las siguientes herramientas:

### Herramientas de Lectura (a mantener/adaptar)
1. **read_graph**: 
   - Función: Lee todo el grafo de conocimiento
   - Parámetros de entrada: Ninguno
   - Salida: Estructura completa del grafo (entidades y relaciones)

2. **search_nodes**:
   - Función: Busca nodos basados en una consulta de texto
   - Parámetros de entrada: `query` (string) - Texto a buscar
   - Salida: Entidades y relaciones que coinciden con la consulta
   - Búsqueda en: Nombres de entidad, tipos de entidad y contenido de observaciones

3. **open_nodes**:
   - Función: Recupera nodos específicos por nombre
   - Parámetros de entrada: `names` (string[]) - Lista de nombres de entidades
   - Salida: Entidades solicitadas y sus relaciones entre sí

### Herramientas de Escritura (a eliminar/reemplazar)
1. **create_entities**
2. **create_relations**
3. **add_observations**
4. **delete_entities**
5. **delete_observations**
6. **delete_relations**

## Diseño de la Nueva Estructura JSON

Para nuestro servidor MCP de solo lectura, diseñaremos una estructura JSON que sea:
1. Fácil de crear y mantener manualmente
2. Eficiente para consultas de lectura
3. Flexible para diferentes tipos de bases de conocimiento

### Estructura Propuesta

```json
{
  "metadata": {
    "title": "Base de Conocimientos",
    "description": "Descripción de la base de conocimientos",
    "version": "1.0",
    "created": "2025-04-23",
    "updated": "2025-04-23"
  },
  "categories": [
    {
      "id": "general",
      "name": "Información General",
      "description": "Conceptos y datos generales"
    },
    {
      "id": "technical",
      "name": "Información Técnica",
      "description": "Detalles técnicos y especificaciones"
    }
  ],
  "entries": [
    {
      "id": "entry1",
      "title": "Título del Entrada 1",
      "category": "general",
      "tags": ["tag1", "tag2"],
      "content": "Contenido detallado de la entrada 1",
      "related": ["entry2", "entry3"]
    },
    {
      "id": "entry2",
      "title": "Título del Entrada 2",
      "category": "technical",
      "tags": ["tag2", "tag3"],
      "content": "Contenido detallado de la entrada 2",
      "related": ["entry1"]
    }
  ]
}
```

### Explicación de la Estructura

1. **metadata**: Información general sobre la base de conocimientos
   - `title`: Título de la base de conocimientos
   - `description`: Descripción general
   - `version`: Versión del documento
   - `created`: Fecha de creación
   - `updated`: Fecha de última actualización

2. **categories**: Categorías para organizar las entradas
   - `id`: Identificador único de la categoría
   - `name`: Nombre legible de la categoría
   - `description`: Descripción de la categoría

3. **entries**: Las entradas de conocimiento
   - `id`: Identificador único de la entrada
   - `title`: Título de la entrada
   - `category`: Categoría a la que pertenece (referencia al ID de categoría)
   - `tags`: Etiquetas para facilitar búsquedas
   - `content`: Contenido principal de la entrada
   - `related`: IDs de entradas relacionadas

## Nuevas Herramientas a Implementar

1. **read_knowledge_base**:
   - Función: Leer toda la base de conocimientos
   - Parámetros: Ninguno
   - Salida: La estructura completa

2. **search_entries**:
   - Función: Buscar entradas por texto
   - Parámetros: `query` (string) - Texto a buscar
   - Salida: Entradas que coinciden con la búsqueda

3. **get_entry_by_id**:
   - Función: Recuperar una entrada específica por ID
   - Parámetros: `id` (string) - ID de la entrada
   - Salida: La entrada solicitada

4. **get_entries_by_category**:
   - Función: Recuperar entradas de una categoría específica
   - Parámetros: `category` (string) - ID de la categoría
   - Salida: Las entradas de la categoría

5. **get_entries_by_tags**:
   - Función: Recuperar entradas que contienen ciertas etiquetas
   - Parámetros: `tags` (string[]) - Lista de etiquetas
   - Salida: Las entradas que coinciden con las etiquetas

6. **get_related_entries**:
   - Función: Recuperar entradas relacionadas con una entrada específica
   - Parámetros: `id` (string) - ID de la entrada
   - Salida: Las entradas relacionadas

7. **get_knowledge_stats**:
   - Función: Obtener estadísticas sobre la base de conocimientos
   - Parámetros: Ninguno
   - Salida: Estadísticas como número de entradas, categorías, etc.
