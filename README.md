## Review Smart Contract

This repository contains a smart contract built using the Azle framework, managing a collection of reviews. The smart contract is written in TypeScript and utilizes features provided by Azle for storage and query operations.
Table of Contents

    # Overview
    Types
    Functions
        getReviews
        getReview
        addReview
        updateReview
    Storage
        reviewStorage
    Usage
    Installation
    Contributing
    License

Overview

This smart contract provides functionality to manage reviews, including retrieving a list of all reviews, fetching a specific review by its unique identifier, adding a new review, and updating an existing review.
Types
Review

    id: Unique identifier for each review.
    body: Text content of the review.
    rating: Numeric value representing the rating assigned to the review.
    websiteURL: URL associated with the reviewed item.
    createdAt: Timestamp indicating the creation time of the review.
    updatedAt: Optional timestamp indicating the last update time of the review.

ReviewPayload

    body: Text content of the review.
    rating: Numeric value representing the rating assigned to the review.
    websiteURL: URL associated with the reviewed item.

Functions
getReviews

typescript

export function getReviews(): Result<Vec<Review>, string>

    Description: Retrieves a list of all reviews stored in the smart contract.
    Returns: A Result containing a Vec<Review> on success or an error message on failure.

getReview

typescript

export function getReview(id: string): Result<Review, string>

    Parameters:
        id (string): Unique identifier of the review to retrieve.
    Description: Retrieves a specific review by its unique identifier.
    Returns: A Result containing the requested Review on success or an error message if the review is not found.

addReview

typescript

export function addReview(payload: ReviewPayload): Result<Review, string>

    Parameters:
        payload (ReviewPayload): Data required to create a new review.
    Description: Adds a new review to the storage.
    Returns: A Result containing the newly created Review on success or an error message on failure.

updateReview

typescript

export function updateReview(id: string, payload: ReviewPayload): Result<Review, string>

    Parameters:
        id (string): Unique identifier of the review to update.
        payload (ReviewPayload): Data to update in the existing review.
    Description: Updates an existing review with the provided data.
    Returns: A Result containing the updated Review on success or an error message if the review is not found.

Storage
reviewStorage

    Type: StableBTreeMap<string, Review>
