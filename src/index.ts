#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { knowledgeManager } from './knowledge-manager.js';

// Inicializar el servidor MCP
const server = new Server({
  name: "knowledge-base-reader",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {},
  },
});

// Definir las herramientas disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "read_knowledge_base",
        description: "Read the entire knowledge base",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "search_entries",
        description: "Search for entries by text",
        inputSchema: {
          type: "object",
          properties: {
            query: { 
              type: "string", 
              description: "The search query to match against entry title, content, and tags" 
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_entry_by_id",
        description: "Retrieve a specific entry by ID",
        inputSchema: {
          type: "object",
          properties: {
            id: { 
              type: "string", 
              description: "ID of the entry to retrieve" 
            },
          },
          required: ["id"],
        },
      },
      {
        name: "get_entries_by_category",
        description: "Retrieve entries of a specific category",
        inputSchema: {
          type: "object",
          properties: {
            category: { 
              type: "string", 
              description: "ID of the category" 
            },
          },
          required: ["category"],
        },
      },
      {
        name: "get_entries_by_tags",
        description: "Retrieve entries that contain certain tags",
        inputSchema: {
          type: "object",
          properties: {
            tags: { 
              type: "array",
              items: { type: "string" },
              description: "List of tags to search for" 
            },
          },
          required: ["tags"],
        },
      },
      {
        name: "get_related_entries",
        description: "Retrieve entries related to a specific entry",
        inputSchema: {
          type: "object",
          properties: {
            id: { 
              type: "string", 
              description: "ID of the entry to find related entries for" 
            },
          },
          required: ["id"],
        },
      },
      {
        name: "get_knowledge_stats",
        description: "Get statistics about the knowledge base",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Manejar las llamadas a las herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "read_knowledge_base":
        return { 
          content: [
            { 
              type: "text", 
              text: JSON.stringify(await knowledgeManager.getKnowledgeBase(), null, 2) 
            }
          ] 
        };
        
      case "search_entries":
        if (!args?.query) {
          return {
            content: [{ type: "text", text: "Error: Missing required parameter 'query'." }],
            isError: true
          };
        }
        return { 
          content: [
            { 
              type: "text", 
              text: JSON.stringify(await knowledgeManager.searchEntries(String(args.query)), null, 2) 
            }
          ] 
        };
        
      case "get_entry_by_id":
        if (!args?.id) {
          return {
            content: [{ type: "text", text: "Error: Missing required parameter 'id'." }],
            isError: true
          };
        }
        const entry = await knowledgeManager.getEntryById(String(args.id));
        if (!entry) {
          return { 
            content: [{ type: "text", text: `Entry with ID '${String(args.id)}' not found.` }],
            isError: true
          };
        }
        return { 
          content: [{ type: "text", text: JSON.stringify(entry, null, 2) }] 
        };
        
      case "get_entries_by_category":
        if (!args?.category) {
          return {
            content: [{ type: "text", text: "Error: Missing required parameter 'category'." }],
            isError: true
          };
        }
        return { 
          content: [
            { 
              type: "text", 
              text: JSON.stringify(await knowledgeManager.getEntriesByCategory(String(args.category)), null, 2) 
            }
          ] 
        };
        
      case "get_entries_by_tags":
        if (!args?.tags || !Array.isArray(args.tags)) {
          return {
            content: [{ type: "text", text: "Error: Missing or invalid required parameter 'tags'. Must be an array of strings." }],
            isError: true
          };
        }
        // Convertir cada elemento del array a string para asegurar el tipo correcto
        const tagArray = args.tags.map(tag => String(tag));
        return { 
          content: [
            { 
              type: "text", 
              text: JSON.stringify(await knowledgeManager.getEntriesByTags(tagArray), null, 2) 
            }
          ] 
        };
        
      case "get_related_entries":
        if (!args?.id) {
          return {
            content: [{ type: "text", text: "Error: Missing required parameter 'id'." }],
            isError: true
          };
        }
        return { 
          content: [
            { 
              type: "text", 
              text: JSON.stringify(await knowledgeManager.getRelatedEntries(String(args.id)), null, 2) 
            }
          ] 
        };
        
      case "get_knowledge_stats":
        return { 
          content: [
            { 
              type: "text", 
              text: JSON.stringify(await knowledgeManager.getKnowledgeStats(), null, 2) 
            }
          ] 
        };
        
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    console.error(`Error handling tool ${name}:`, error);
    return {
      content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
      isError: true
    };
  }
});

// Función principal para iniciar el servidor
async function main() {
  try {
    // Cargar la base de conocimientos al inicio para asegurar que existe y está bien formada
    await knowledgeManager.loadKnowledgeBase();
    
    // Conectar con el transporte STDIO
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Knowledge Base Reader MCP Server running on stdio");
  } catch (error) {
    console.error("Error initializing server:", error);
    process.exit(1);
  }
}

// Iniciar el servidor
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
