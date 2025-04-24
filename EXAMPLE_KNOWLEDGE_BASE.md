# Ejemplo de Base de Conocimientos

A continuación se presenta un ejemplo simplificado de una base de conocimientos en formato JSON que puedes usar como plantilla para crear tu propia base de conocimientos.

## Estructura Básica

```json
{
  "metadata": {
    "title": "Mi Base de Conocimientos",
    "description": "Una descripción de mi base de conocimientos",
    "version": "1.0",
    "created": "2025-04-23",
    "updated": "2025-04-23"
  },
  "categories": [
    {
      "id": "categoria1",
      "name": "Nombre de la Categoría 1",
      "description": "Descripción de la categoría 1"
    },
    {
      "id": "categoria2",
      "name": "Nombre de la Categoría 2",
      "description": "Descripción de la categoría 2"
    }
  ],
  "entries": [
    {
      "id": "entrada1",
      "title": "Título de la Entrada 1",
      "category": "categoria1",
      "tags": ["etiqueta1", "etiqueta2"],
      "content": "Contenido detallado de la entrada 1",
      "related": ["entrada2"]
    },
    {
      "id": "entrada2",
      "title": "Título de la Entrada 2",
      "category": "categoria2",
      "tags": ["etiqueta2", "etiqueta3"],
      "content": "Contenido detallado de la entrada 2",
      "related": ["entrada1"]
    }
  ]
}
```

## Ejemplo de un Caso de Uso Práctico

Aquí hay un ejemplo práctico para una base de conocimientos sobre programación:

```json
{
  "metadata": {
    "title": "Guía de Programación",
    "description": "Base de conocimientos sobre conceptos de programación",
    "version": "1.0",
    "created": "2025-04-23",
    "updated": "2025-04-23"
  },
  "categories": [
    {
      "id": "fundamentos",
      "name": "Fundamentos de Programación",
      "description": "Conceptos básicos de programación"
    },
    {
      "id": "javascript",
      "name": "JavaScript",
      "description": "Todo sobre el lenguaje JavaScript"
    },
    {
      "id": "python",
      "name": "Python",
      "description": "Información sobre Python"
    }
  ],
  "entries": [
    {
      "id": "variables",
      "title": "Variables y Tipos de Datos",
      "category": "fundamentos",
      "tags": ["básico", "variables", "tipos"],
      "content": "Las variables son contenedores para almacenar datos. Los tipos básicos incluyen números, cadenas de texto y booleanos. Ejemplo: let nombre = 'Juan'; // variable tipo string",
      "related": ["funciones", "condicionales"]
    },
    {
      "id": "funciones",
      "title": "Funciones",
      "category": "fundamentos",
      "tags": ["básico", "funciones"],
      "content": "Las funciones son bloques de código reutilizables que realizan una tarea específica. Ejemplo: function suma(a, b) { return a + b; }",
      "related": ["variables", "alcance"]
    },
    {
      "id": "alcance",
      "title": "Alcance (Scope)",
      "category": "fundamentos",
      "tags": ["intermedio", "variables", "funciones"],
      "content": "El alcance determina la visibilidad de variables y funciones en diferentes partes del código. Hay alcance global y local.",
      "related": ["variables", "funciones"]
    },
    {
      "id": "condicionales",
      "title": "Estructuras Condicionales",
      "category": "fundamentos",
      "tags": ["básico", "control", "condicionales"],
      "content": "Las estructuras condicionales como if-else permiten ejecutar código basado en condiciones. Ejemplo: if (edad >= 18) { console.log('Es adulto'); } else { console.log('Es menor'); }",
      "related": ["variables", "operadores"]
    },
    {
      "id": "operadores",
      "title": "Operadores",
      "category": "fundamentos",
      "tags": ["básico", "operadores"],
      "content": "Los operadores permiten realizar operaciones en variables y valores. Incluyen operadores aritméticos (+, -, *, /), de comparación (==, ===, >, <) y lógicos (&&, ||, !).",
      "related": ["variables", "condicionales"]
    },
    {
      "id": "js-dom",
      "title": "Manipulación del DOM en JavaScript",
      "category": "javascript",
      "tags": ["intermedio", "DOM", "web"],
      "content": "JavaScript puede modificar el DOM (Document Object Model) para actualizar dinámicamente el contenido de una página web. Ejemplo: document.getElementById('demo').innerHTML = 'Nuevo texto';",
      "related": ["js-eventos"]
    },
    {
      "id": "js-eventos",
      "title": "Eventos en JavaScript",
      "category": "javascript",
      "tags": ["intermedio", "eventos", "interacción"],
      "content": "Los eventos permiten ejecutar código en respuesta a acciones del usuario. Ejemplo: document.getElementById('boton').addEventListener('click', function() { alert('Botón clickeado'); });",
      "related": ["js-dom"]
    },
    {
      "id": "py-listas",
      "title": "Listas en Python",
      "category": "python",
      "tags": ["básico", "listas", "colecciones"],
      "content": "Las listas en Python son colecciones ordenadas y mutables. Ejemplo: numeros = [1, 2, 3, 4]; numeros.append(5)",
      "related": ["py-diccionarios"]
    },
    {
      "id": "py-diccionarios",
      "title": "Diccionarios en Python",
      "category": "python",
      "tags": ["básico", "diccionarios", "colecciones"],
      "content": "Los diccionarios almacenan pares clave-valor. Ejemplo: persona = {'nombre': 'Ana', 'edad': 30}; print(persona['nombre'])",
      "related": ["py-listas"]
    }
  ]
}
```

## Recomendaciones para Crear tu Base de Conocimientos

1. **IDs Únicos y Descriptivos**: Usa identificadores únicos y representativos para entradas y categorías.

2. **Contenido Conciso**: Mantén cada entrada enfocada en un solo concepto.

3. **Relaciones Significativas**: Conecta entradas relacionadas para facilitar la navegación.

4. **Etiquetas Consistentes**: Crea un vocabulario de etiquetas coherente para categorización.

5. **Categorización Clara**: Organiza entradas en categorías lógicas.

6. **Balance de Detalle**: Proporciona suficiente información sin sobrecargar las entradas.

7. **Metadatos Actualizados**: Mantén actualizados los campos de versión y fecha.

## Pasos para Implementar tu Base de Conocimientos

1. Crea un archivo JSON siguiendo la estructura anterior
2. Guárdalo en una ubicación accesible en tu sistema
3. Configura la variable de entorno `KNOWLEDGE_BASE_PATH` para apuntar a tu archivo
4. Inicia el servidor MCP Knowledge Base Reader
5. Conecta Claude para interactuar con tu base de conocimientos

## Expandiendo tu Base de Conocimientos

Para bases de conocimiento más grandes, considera:

1. Dividir en secciones lógicas (documentos separados para grandes dominios)
2. Crear un sistema de índices para navegación mejorada
3. Implementar un flujo de trabajo para mantener actualizada la información
4. Agregar campos adicionales para metadatos específicos de tu dominio
