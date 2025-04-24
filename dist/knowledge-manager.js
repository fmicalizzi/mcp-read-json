import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Define la ruta al archivo de la base de conocimientos usando una variable de entorno o un valor predeterminado
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultKnowledgeBasePath = path.join(__dirname, '..', 'data', 'knowledge_base.json');
const KNOWLEDGE_BASE_PATH = process.env.KNOWLEDGE_BASE_PATH || defaultKnowledgeBasePath;
export class KnowledgeBaseManager {
    knowledgeBase = null;
    // Carga la base de conocimientos desde el archivo JSON
    async loadKnowledgeBase() {
        if (this.knowledgeBase) {
            return this.knowledgeBase; // Devuelve cached version si ya está cargada
        }
        try {
            const data = await fs.readFile(KNOWLEDGE_BASE_PATH, 'utf-8');
            this.knowledgeBase = JSON.parse(data);
            return this.knowledgeBase;
        }
        catch (error) {
            if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
                throw new Error(`Knowledge base file not found at ${KNOWLEDGE_BASE_PATH}`);
            }
            throw error;
        }
    }
    // Obtiene toda la base de conocimientos
    async getKnowledgeBase() {
        return this.loadKnowledgeBase();
    }
    // Busca entradas por texto
    async searchEntries(query) {
        const knowledgeBase = await this.loadKnowledgeBase();
        const searchResults = [];
        const normalizedQuery = query.toLowerCase();
        for (const entry of knowledgeBase.entries) {
            const matchesIn = [];
            let relevance = 0;
            // Buscar en el título (mayor relevancia)
            if (entry.title.toLowerCase().includes(normalizedQuery)) {
                matchesIn.push('title');
                relevance += 3;
            }
            // Buscar en el contenido
            if (entry.content.toLowerCase().includes(normalizedQuery)) {
                matchesIn.push('content');
                relevance += 2;
            }
            // Buscar en las etiquetas
            const tagMatches = entry.tags.filter(tag => tag.toLowerCase().includes(normalizedQuery));
            if (tagMatches.length > 0) {
                matchesIn.push('tags');
                relevance += tagMatches.length;
            }
            // Si hubo coincidencia en algún campo, agregar a los resultados
            if (matchesIn.length > 0) {
                searchResults.push({
                    entry,
                    relevance,
                    matchesIn
                });
            }
        }
        // Ordenar por relevancia (mayor a menor)
        return searchResults.sort((a, b) => b.relevance - a.relevance);
    }
    // Obtiene una entrada por su ID
    async getEntryById(id) {
        const knowledgeBase = await this.loadKnowledgeBase();
        return knowledgeBase.entries.find(entry => entry.id === id) || null;
    }
    // Obtiene entradas por categoría
    async getEntriesByCategory(categoryId) {
        const knowledgeBase = await this.loadKnowledgeBase();
        // Verificar que la categoría existe
        const categoryExists = knowledgeBase.categories.some(cat => cat.id === categoryId);
        if (!categoryExists) {
            return [];
        }
        return knowledgeBase.entries.filter(entry => entry.category === categoryId);
    }
    // Obtiene entradas por etiquetas
    async getEntriesByTags(tags) {
        const knowledgeBase = await this.loadKnowledgeBase();
        if (!tags || tags.length === 0) {
            return [];
        }
        return knowledgeBase.entries.filter(entry => tags.some(tag => entry.tags.includes(tag)));
    }
    // Obtiene entradas relacionadas con una entrada específica
    async getRelatedEntries(entryId) {
        const knowledgeBase = await this.loadKnowledgeBase();
        // Primero obtener la entrada
        const entry = await this.getEntryById(entryId);
        if (!entry) {
            return [];
        }
        // Luego obtener las entradas relacionadas
        return knowledgeBase.entries.filter(e => entry.related.includes(e.id));
    }
    // Obtiene estadísticas sobre la base de conocimientos
    async getKnowledgeStats() {
        const knowledgeBase = await this.loadKnowledgeBase();
        // Calcular entradas por categoría
        const entriesByCategory = {};
        knowledgeBase.categories.forEach(cat => {
            entriesByCategory[cat.id] = knowledgeBase.entries.filter(entry => entry.category === cat.id).length;
        });
        // Calcular etiquetas más comunes
        const tagCounts = {};
        knowledgeBase.entries.forEach(entry => {
            entry.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        const topTags = Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10); // Top 10 etiquetas
        // Calcular promedio de entradas relacionadas
        const totalRelated = knowledgeBase.entries.reduce((sum, entry) => sum + entry.related.length, 0);
        const avgRelated = totalRelated / knowledgeBase.entries.length || 0;
        return {
            totalEntries: knowledgeBase.entries.length,
            totalCategories: knowledgeBase.categories.length,
            entriesByCategory,
            topTags,
            avgRelatedEntriesPerEntry: avgRelated
        };
    }
}
// Exportar una instancia para usarla en el servidor
export const knowledgeManager = new KnowledgeBaseManager();
