# Guía de Uso Avanzado para MCP Knowledge Base Reader

Esta guía proporciona ejemplos detallados y técnicas avanzadas para aprovechar al máximo el servidor MCP Knowledge Base Reader.

## Patrones de Uso Efectivo

### 1. Flujo de Exploración Recomendado

Para una exploración óptima de la base de conocimientos, sigue este flujo:

1. **Visión General**: Comienza con `get_knowledge_stats` para entender la estructura
2. **Exploración por Categorías**: Usa `get_entries_by_category` para explorar categorías de interés
3. **Profundización**: Utiliza `get_entry_by_id` para ver detalles de entradas específicas
4. **Navegación Relacionada**: Usa `get_related_entries` para explorar temas conectados
5. **Búsqueda Específica**: Emplea `search_entries` cuando busques algo específico

### 2. Consultas de Búsqueda Efectivas

Para obtener mejores resultados con la herramienta `search_entries`:

- Usa términos específicos y técnicos
- Incluye variaciones de términos importantes
- Combina términos de diferentes aspectos del tema
- Prueba con diferentes niveles de especificidad

**Ejemplos de Consultas Efectivas:**
```
"implementación seguridad"
"arquitectura componentes MCP"
"validación entrada zod"
```

### 3. Navegación Contextual

Una técnica poderosa es la "navegación contextual" - seguir conexiones entre entradas relacionadas:

1. Comienza con una entrada de interés usando `get_entry_by_id`
2. Observa los IDs listados en el campo `related`
3. Usa `get_related_entries` para obtener esas entradas relacionadas
4. Explora esas entradas y sus conexiones

Este enfoque permite descubrir conexiones no obvias y obtener una comprensión más profunda del tema.

## Ejemplos de Interacción con Claude

### Ejemplo 1: Exploración Estructurada

**Usuario**: Claude, quiero aprender sobre MCP de manera estructurada. ¿Puedes guiarme?

**Claude**: 
Voy a usar la base de conocimientos para guiarte de manera estructurada sobre MCP.

```
[Claude usa get_knowledge_stats para obtener una visión general]
[Claude usa get_entries_by_category con category="intro" para comenzar con fundamentos]
```

Para aprender MCP de manera estructurada, te recomiendo esta secuencia:

1. **Conceptos Fundamentales**:
   - Comencemos con "¿Qué es MCP?" - El MCP es un protocolo que permite a aplicaciones proveer contexto estructurado para LLMs.
   - Luego "Arquitectura MCP" - Explica el patrón cliente-servidor y la separación de responsabilidades.
   - Después "Componentes MCP" - Presenta los tres tipos de capacidades: Recursos, Herramientas y Prompts.

2. **Implementaciones Específicas**:
   - Podemos continuar con cómo implementar cada componente
   - Explorar aspectos de seguridad

¿Te gustaría empezar por algún tema específico?

### Ejemplo 2: Búsqueda de Resolución de Problemas

**Usuario**: Estoy teniendo problemas con la validación de entradas en mi servidor MCP. ¿Qué debo hacer?

**Claude**:
Voy a buscar información relevante sobre validación en servidores MCP.

```
[Claude usa search_entries con query="validación entrada"]
[Claude usa get_entry_by_id con id="security-zod" para detalles específicos]
```

Según la base de conocimientos, para validación de entradas en servidores MCP deberías:

1. **Usar Zod para validación**:
   Zod es esencial para validar entradas en servidores MCP, permitiendo definir esquemas tipados con validación en tiempo de ejecución.

   Ejemplo básico:
   ```javascript
   const esquemaUsuario = z.object({
     nombre: z.string().min(3).max(50),
     edad: z.number().int().positive().optional(),
     email: z.string().email(),
     rol: z.enum(['admin', 'usuario', 'invitado'])
   });
   ```

2. **Aplicar principios de seguridad**:
   - Validación estricta de entrada usando Zod
   - Principio de Privilegio Mínimo
   - Sanitización de datos

¿Hay algún aspecto específico de la validación con el que estás teniendo problemas?

### Ejemplo 3: Análisis Comparativo

**Usuario**: ¿Cuál es la diferencia entre herramientas, recursos y prompts en MCP?

**Claude**:
Voy a buscar información sobre estos tres componentes de MCP.

```
[Claude usa get_entry_by_id con id="mcp-components"]
[Claude usa get_entry_by_id con id="tools-implementation" y "resources-implementation" y "prompts-implementation" para detalles]
```

Según la base de conocimientos, las principales diferencias entre herramientas, recursos y prompts en MCP son:

**1. Herramientas**:
- **Propósito**: Permiten al LLM ejecutar acciones y producir efectos secundarios
- **Analogía**: Similar a endpoints POST en una API REST
- **Implementación**: Usan el método `tool()` con un nombre, esquema de validación y función de manejo
- **Caso de uso típico**: Realizar cálculos, procesar datos, interactuar con sistemas externos

**2. Recursos**:
- **Propósito**: Proporcionan datos e información al LLM sin procesamiento significativo
- **Analogía**: Similar a endpoints GET en una API REST
- **Implementación**: Usan el método `resource()` con un nombre, URI y función de respuesta
- **Caso de uso típico**: Proporcionar datos estáticos o recuperar información

**3. Prompts**:
- **Propósito**: Definen plantillas reusables para estructurar interacciones con el LLM
- **Analogía**: Templates para comunicación con el LLM
- **Implementación**: Usan el método `prompt()` con un nombre, esquema de parámetros y función constructora
- **Caso de uso típico**: Estandarizar formatos de interacción para casos de uso repetitivos

¿Hay algún aspecto específico de estos componentes que te gustaría explorar más a fondo?

## Sugerencias para Personalizar tu Base de Conocimientos

### Estructura de Datos Optimizada

Para crear tu propia base de conocimientos efectiva:

1. **Organiza Jerárquicamente**: Usa categorías para agrupar temas relacionados
2. **Entradas Atómicas**: Cada entrada debe enfocarse en un solo concepto
3. **Enlaces Significativos**: Establece relaciones entre entradas relevantes
4. **Etiquetas Consistentes**: Mantén un vocabulario de etiquetas coherente
5. **Metadatos Informativos**: Proporciona descripciones claras de categorías

### Ejemplo de Estructura para Otros Dominios

Este patrón de base de conocimientos se adapta bien a otros dominios como:

- **Documentación Técnica**: Categorías por subsistemas, entradas por componentes
- **Bases de Conocimiento Médico**: Categorías por especialidades, entradas por condiciones
- **Material Educativo**: Categorías por temas, entradas por lecciones o conceptos
- **Conocimiento Organizacional**: Categorías por departamentos, entradas por procesos

## Referencia Rápida de Herramientas

| Herramienta | Parámetros | Descripción | Cuándo Usar |
|-------------|------------|-------------|-------------|
| `read_knowledge_base` | Ninguno | Lee toda la base de conocimientos | Para exploración completa |
| `search_entries` | `query` (string) | Busca entradas por texto | Para consultas específicas |
| `get_entry_by_id` | `id` (string) | Recupera entrada por ID | Para detalles específicos |
| `get_entries_by_category` | `category` (string) | Filtra por categoría | Para explorar un tema |
| `get_entries_by_tags` | `tags` (string[]) | Filtra por etiquetas | Para temas transversales |
| `get_related_entries` | `id` (string) | Encuentra entradas relacionadas | Para navegación contextual |
| `get_knowledge_stats` | Ninguno | Estadísticas de la base | Para visión general |
