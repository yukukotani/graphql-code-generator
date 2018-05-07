/* tslint:disable */
/** A character from the Star Wars universe */
export interface Character {
  readonly id: string /** The ID of the character */;
  readonly name: string /** The name of the character */;
  readonly friends?: ReadonlyArray<Character | null> | null /** The friends of the character, or an empty list if they have none */;
  readonly friendsConnection: FriendsConnection /** The friends of the character exposed as a connection with edges */;
  readonly appearsIn: ReadonlyArray<Episode | null> /** The movies this character appears in */;
}
/** The query type, represents all of the entry points into our object graph */
export interface Query {
  readonly hero?: Character | null;
  readonly reviews?: ReadonlyArray<Review | null> | null;
  readonly search?: ReadonlyArray<SearchResult | null> | null;
  readonly character?: Character | null;
  readonly droid?: Droid | null;
  readonly human?: Human | null;
  readonly starship?: Starship | null;
}
/** A connection object for a character's friends */
export interface FriendsConnection {
  readonly totalCount?: number | null /** The total number of friends */;
  readonly edges?: ReadonlyArray<FriendsEdge | null> | null /** The edges for each of the character's friends. */;
  readonly friends?: ReadonlyArray<Character | null> | null /** A list of the friends, as a convenience when edges are not needed. */;
  readonly pageInfo: PageInfo /** Information for paginating this connection */;
}
/** An edge object for a character's friends */
export interface FriendsEdge {
  readonly cursor: string /** A cursor used for pagination */;
  readonly node?: Character | null /** The character represented by this friendship edge */;
}
/** Information for paginating this connection */
export interface PageInfo {
  readonly startCursor?: string | null;
  readonly endCursor?: string | null;
  readonly hasNextPage: boolean;
}
/** Represents a review for a movie */
export interface Review {
  readonly stars: number /** The number of stars this review gave, 1-5 */;
  readonly commentary?: string | null /** Comment about the movie */;
}
/** A humanoid creature from the Star Wars universe */
export interface Human extends Character {
  readonly id: string /** The ID of the human */;
  readonly name: string /** What this human calls themselves */;
  readonly homePlanet?: string | null /** The home planet of the human, or null if unknown */;
  readonly height?: number | null /** Height in the preferred unit, default is meters */;
  readonly mass?: number | null /** Mass in kilograms, or null if unknown */;
  readonly friends?: ReadonlyArray<Character | null> | null /** This human's friends, or an empty list if they have none */;
  readonly friendsConnection: FriendsConnection /** The friends of the human exposed as a connection with edges */;
  readonly appearsIn: ReadonlyArray<Episode | null> /** The movies this human appears in */;
  readonly starships?: ReadonlyArray<Starship | null> | null /** A list of starships this person has piloted, or an empty list if none */;
}

export interface Starship {
  readonly id: string /** The ID of the starship */;
  readonly name: string /** The name of the starship */;
  readonly length?: number | null /** Length of the starship, along the longest axis */;
}
/** An autonomous mechanical character in the Star Wars universe */
export interface Droid extends Character {
  readonly id: string /** The ID of the droid */;
  readonly name: string /** What others call this droid */;
  readonly friends?: ReadonlyArray<Character | null> | null /** This droid's friends, or an empty list if they have none */;
  readonly friendsConnection: FriendsConnection /** The friends of the droid exposed as a connection with edges */;
  readonly appearsIn: ReadonlyArray<Episode | null> /** The movies this droid appears in */;
  readonly primaryFunction?: string | null /** This droid's primary function */;
}
/** The mutation type, represents all updates we can make to our data */
export interface Mutation {
  readonly createReview?: Review | null;
}
/** The input object sent when someone is creating a new review */
export interface ReviewInput {
  readonly stars: number /** 0-5 stars */;
  readonly commentary?: string | null /** Comment about the movie, optional */;
  readonly favoriteColor?: ColorInput | null /** Favorite color, optional */;
}
/** The input object sent when passing a color */
export interface ColorInput {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}
export interface HeroQueryArgs {
  episode?: Episode | null;
}
export interface ReviewsQueryArgs {
  episode: Episode;
}
export interface SearchQueryArgs {
  text?: string | null;
}
export interface CharacterQueryArgs {
  id: string;
}
export interface DroidQueryArgs {
  id: string;
}
export interface HumanQueryArgs {
  id: string;
}
export interface StarshipQueryArgs {
  id: string;
}
export interface HeightHumanArgs {
  unit?: LengthUnit | null;
}
export interface FriendsConnectionHumanArgs {
  first?: number | null;
  after?: string | null;
}
export interface LengthStarshipArgs {
  unit?: LengthUnit | null;
}
export interface FriendsConnectionDroidArgs {
  first?: number | null;
  after?: string | null;
}
export interface CreateReviewMutationArgs {
  episode?: Episode | null;
  review: ReviewInput;
}
/** The episodes in the Star Wars trilogy */
export enum Episode {
  NEWHOPE = 'NEWHOPE',
  EMPIRE = 'EMPIRE',
  JEDI = 'JEDI'
}
/** Units of height */
export enum LengthUnit {
  METER = 'METER',
  FOOT = 'FOOT'
}

export type SearchResult = Human | Droid | Starship;

export namespace CreateReviewForEpisode {
  export type Variables = {
    episode: Episode;
    review: ReviewInput;
  };

  export type Mutation = {
    __typename?: 'Mutation';
    readonly createReview?: CreateReview | null;
  };

  export type CreateReview = {
    __typename?: 'Review';
    readonly stars: number;
    readonly commentary?: string | null;
  };
}
export namespace HeroAndFriendsNames {
  export type Variables = {
    episode?: Episode | null;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = {
    __typename?: 'Character';
    readonly name: string;
    readonly friends?: ReadonlyArray<Friends | null> | null;
  };

  export type Friends = {
    __typename?: 'Character';
    readonly name: string;
  };
}
export namespace HeroAppearsIn {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = {
    __typename?: 'Character';
    readonly name: string;
    readonly appearsIn: ReadonlyArray<Episode | null>;
  };
}
export namespace HeroDetails {
  export type Variables = {
    episode?: Episode | null;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = {
    __typename?: HumanInlineFragment['__typename'] | DroidInlineFragment['__typename'];
    readonly name: string;
  } & (HumanInlineFragment | DroidInlineFragment);

  export type HumanInlineFragment = {
    __typename?: 'Human';
    readonly height?: number | null;
  };

  export type DroidInlineFragment = {
    __typename?: 'Droid';
    readonly primaryFunction?: string | null;
  };
}
export namespace HeroDetailsWithFragment {
  export type Variables = {
    episode?: Episode | null;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = HeroDetails.Fragment;
}
export namespace HeroName {
  export type Variables = {
    episode?: Episode | null;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = {
    __typename?: 'Character';
    readonly name: string;
  };
}
export namespace HeroNameConditionalInclusion {
  export type Variables = {
    episode?: Episode | null;
    includeName: boolean;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = {
    __typename?: 'Character';
    readonly name: string;
  };
}
export namespace HeroNameConditionalExclusion {
  export type Variables = {
    episode?: Episode | null;
    skipName: boolean;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = {
    __typename?: 'Character';
    readonly name: string;
  };
}
export namespace HeroParentTypeDependentField {
  export type Variables = {
    episode?: Episode | null;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = {
    __typename?: HumanInlineFragment['__typename'] | DroidInlineFragment['__typename'];
    readonly name: string;
  } & (HumanInlineFragment | DroidInlineFragment);

  export type HumanInlineFragment = {
    __typename?: 'Human';
    readonly friends?: ReadonlyArray<Friends | null> | null;
  };

  export type Friends = {
    __typename?: _HumanInlineFragment['__typename'];
    readonly name: string;
  } & (_HumanInlineFragment);

  export type _HumanInlineFragment = {
    __typename?: 'Human';
    readonly height?: number | null;
  };

  export type DroidInlineFragment = {
    __typename?: 'Droid';
    readonly friends?: ReadonlyArray<_Friends | null> | null;
  };

  export type _Friends = {
    __typename?: __HumanInlineFragment['__typename'];
    readonly name: string;
  } & (__HumanInlineFragment);

  export type __HumanInlineFragment = {
    __typename?: 'Human';
    readonly height?: number | null;
  };
}
export namespace HeroTypeDependentAliasedField {
  export type Variables = {
    episode?: Episode | null;
  };

  export type Query = {
    __typename?: 'Query';
    readonly hero?: Hero | null;
  };

  export type Hero = HumanInlineFragment | DroidInlineFragment;

  export type HumanInlineFragment = {
    __typename?: 'Human';
    readonly property?: string | null;
  };

  export type DroidInlineFragment = {
    __typename?: 'Droid';
    readonly property?: string | null;
  };
}
export namespace HumanWithNullHeight {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';
    readonly human?: Human | null;
  };

  export type Human = {
    __typename?: 'Human';
    readonly name: string;
    readonly mass?: number | null;
  };
}
export namespace TwoHeroes {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';
    readonly r2?: R2 | null;
    readonly luke?: Luke | null;
  };

  export type R2 = {
    __typename?: 'Character';
    readonly name: string;
  };

  export type Luke = {
    __typename?: 'Character';
    readonly name: string;
  };
}

export namespace HeroDetails {
  export type Fragment = {
    __typename?: 'Character';
    readonly name: string;
  } & (HumanInlineFragment | DroidInlineFragment);

  export type HumanInlineFragment = {
    __typename?: 'Human';
    readonly height?: number | null;
  };

  export type DroidInlineFragment = {
    __typename?: 'Droid';
    readonly primaryFunction?: string | null;
  };
}
