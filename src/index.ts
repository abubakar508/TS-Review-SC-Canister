import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Review = Record<{
    id: string;
    body: string;
    rating: number;
    websiteURL: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type ReviewPayload = Record<{
    body: string;
    rating: number;
    websiteURL: string;
}>

const reviewStorage = new StableBTreeMap<string, Review>(0, 44, 1024);

// Get a list of all reviews
$query
export function getReviews(): Result<Vec<Review>, string> {
    return Result.Ok(reviewStorage.values());
}

// Get a specific review by ID
$query
export function getReview(id: string): Result<Review, string> {
    const review = reviewStorage.get(id);
    if (review !== null) {
        return Result.Ok(review);
    } else {
        return Result.Err(`A review with id=${id} not found`);
    }
}

// Add a new review
$update
export function addReview(payload: ReviewPayload): Result<Review, string> {
    // Validate input
    if (!payload.body || !payload.rating || !payload.websiteURL) {
        return Result.Err('Invalid input');
    }

    const id = uuidv4();
    const createdAt = ic.time();
    const review: Review = { id, createdAt, updatedAt: Opt.None, ...payload };
    reviewStorage.insert(id, review);
    // Check if the review was added successfully
    if (reviewStorage.get(id) !== null) {
        return Result.Ok(review);
    } else {
        return Result.Err('Failed to add review');
    }
}

// Update an existing review by ID
$update
export function updateReview(id: string, payload: ReviewPayload): Result<Review, string> {
    // Validate input
    if (!payload.body || !payload.rating || !payload.websiteURL) {
        return Result.Err('Invalid input');
    }

    const existingReview = reviewStorage.get(id);
    if (existingReview !== null) {
        const updatedAt = Opt.Some(ic.time());
        const updatedReview: Review = { ...existingReview, ...payload, updatedAt };
        reviewStorage.insert(id, updatedReview);
        return Result.Ok(updatedReview);
    } else {
        return Result.Err(`Couldn't update a review with id=${id}. Review not found`);
    }
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    getRandomValues: () => {
        const array = new Uint8Array(32);
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
        return array;
    }
};
