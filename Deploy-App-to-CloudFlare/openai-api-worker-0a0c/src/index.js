/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import OpenAI from 'openai';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx) {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: 'https://gateway.ai.cloudflare.com/v1/d4e5f8c6f392463874fea07d627e367d/stockpredictions/openai'
		});

		const messages = await request.json();

		try {
			const chatCompletion = await openai.chat.completions.create({
				model: 'gpt-4',
				messages,
				temperature: 1.1,
				presence_penalty: 0,
				frequency_penalty: 0,
			});
			const response = chatCompletion.choices[0].message;

			return new Response(JSON.stringify(response), { headers: corsHeaders });
		} catch (e) {
			return new Response(e, { headers: corsHeaders });
		}
	},
};
