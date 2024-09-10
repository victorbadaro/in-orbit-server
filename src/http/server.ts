import fastify from 'fastify';
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler
} from 'fastify-type-provider-zod';
import z from 'zod';
import { createGoal } from '../functions/create-goal';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
	'/goals',
	{
		schema: {
			body: z.object({
				title: z.string(),
				desiredWeeklyFrequency: z.number().int().min(1).max(7)
			})
		}
	},
	async (request, reply) => {
		const { title, desiredWeeklyFrequency } = request.body;

		await createGoal({
			title,
			desiredWeeklyFrequency
		});
	}
);

app
	.listen({ port: 3000 })
	.then(() => console.log('HTTP server running! Port: 3000'));
