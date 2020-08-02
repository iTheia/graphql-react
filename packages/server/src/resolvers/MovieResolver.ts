import {
	Resolver,
	Mutation,
	Arg,
	Int,
	Query,
	Field,
	InputType,
	Args,
} from 'type-graphql';
import { Movie } from '../entity/Movie';

@InputType()
class MovieInput {
	@Field()
	title: string;

	@Field(() => Int)
	minutes: number;
}

@InputType()
class MovieUpdateInput {
	@Field(() => String, { nullable: true })
	title?: string | null;

	@Field(() => Int, { nullable: true, defaultValue: 60 })
	minutes: number | null;
}

@Resolver()
export class MovieResolver {
	@Mutation(() => Movie)
	async createMovie(@Arg('options', () => MovieInput) options: MovieInput) {
		const movie = await Movie.create(options).save();
		return movie;
	}

	@Mutation(() => Movie)
	async updateMovie(
		@Arg('id', () => Int, { nullable: false }) id: number,
		@Arg('options', () => MovieUpdateInput, { nullable: false })
		options: MovieUpdateInput
	) {
		const movie = await Movie.update({ id }, options);
		return movie;
	}

	@Mutation(() => Boolean)
	async deleteMovie(@Arg('id', () => Int, { nullable: false }) id: number) {
		await Movie.delete({ id });
		return true;
	}

	@Query(() => [Movie])
	movies() {
		return Movie.find();
	}
}
