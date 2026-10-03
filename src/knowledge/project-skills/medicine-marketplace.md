# Medicine Marketplace

This project is also referred to as MedAIMart in the portfolio.

## Skill: Product Context
- A marketplace for reselling unused medicines, designed around verification, admin approval, and payment security.
- The stated product goal is to improve safety and trust in medicine resale.

## Skill: Seller Medicine-Image Upload
- In the React seller form, choosing a file stores the browser `File` and creates a local preview with `URL.createObjectURL`.
- The seller form creates `FormData`, appends the image under the field name `image`, and submits it with Axios as `multipart/form-data` to `POST /medicines/upload`.
- The Express route applies `upload.single("image")` from `server/src/middlewares/upload.middleware.js`.
- Multer uses `memoryStorage()`: the image is held in `req.file.buffer` for the request; this route does not write an intermediate local upload file.
- The Multer file filter accepts JPEG/JPG, PNG, GIF, and WebP MIME types and limits files to 5 MB. The UI copy says “up to 10MB,” but the server-side 5 MB limit is authoritative.
- `uploadMedicine` streams the buffer to Cloudinary in the `medicine-resale-platform` folder and gets a secure image URL.
- The controller stores that URL in the MongoDB medicine document's `image` field, with the extracted medicine data, seller ID, stock, description, calculated price, and initial `pending` status. MongoDB stores the URL, not the uploaded image bytes.

## Skill: Rider Collection-Proof Upload
- The rider form selects one proof image and creates a local preview.
- The client builds `FormData` with `medicineId` and a `proof` file, then posts it to `POST /rider/confirm-collection`.
- The Express route applies `upload.single("proof")` using the same Multer memory-storage middleware and file-size/type checks.
- The controller verifies that the authenticated rider is assigned to the medicine before uploading the proof buffer to Cloudinary's `rider-proofs` folder.
- It saves the returned URL as `pickupProof`, changes the medicine status to `collected`, and updates the rider's assigned/completed task lists.

## Skill: Medicine Image Scan
- The seller can scan the selected image before submitting the listing. The client posts it as multipart field `image` to `POST /medicines/scan`.
- In the checked public repository `main` source, `extractMedicineDetails` base64-encodes the Multer buffer and calls Groq's chat-completions API through Axios with model `qwen/qwen3.6-27b` and an `image_url` data URI.
- The model is prompted to return JSON containing medicine name, generic name, manufacturer, batch number, expiry date, MRP, description, image quality, and whether the item is medical.
- The scan response can prefill the seller form. If the client submits `extractedData`, the final upload controller uses it rather than repeating the vision request; otherwise it performs extraction during upload.
- The checked scan path uses Groq Qwen Vision, not a client-side Tesseract.js OCR call. Although Tesseract.js appears in the server dependencies, the inspected medicine upload/scan handlers do not call it.
- If Groq credentials are missing or mock mode is requested, the controller has a mock-data fallback. Vision failures return a manual-entry response.

## Skill: Validation and Workflow
- The upload controller rejects images identified as non-medical and validates expiry using the server's `MIN_EXPIRY_DAYS` rule.
- The seller page also blocks validated medicines with invalid expiry dates or less than 30 days remaining.
- The listed sale price is calculated as 70% of the extracted MRP, and a new medicine starts with `pending` status for subsequent review.
- The broader project describes an event-driven commerce flow with explicit admin and rider approval states, pickup proof, inventory, orders, and payment workflows.

## Skill: Technology Decisions
- The checked repository source uses React, Node.js, Express, Multer 2, Cloudinary 2, MongoDB/Mongoose, Axios, Razorpay, and Groq's `qwen/qwen3.6-27b` vision model.
- Multer handles multipart parsing and validation; Cloudinary stores the image; MongoDB stores its URL and listing metadata. These are separate responsibilities.
- The portfolio data and checked repository source have differed on the vision provider/model. The current checked `main` controller explicitly calls Groq with `qwen/qwen3.6-27b`; do not substitute Gemini for that code path.

## Skill: Product Capabilities
- Vision-assisted medicine metadata extraction and rule-based resale validation.
- Admin approval and rider verification.
- Pickup proof, inventory, orders, wallet credit, and payment workflows.

## Skill: Engineering Challenges
- The project record describes a Verification Guard intended to prevent fraudulent listings.
- Rider routing logic was optimized for medicine collection.
- Explain safeguards as described; no false-positive, fraud-rate, or routing benchmark is documented.

## Skill: Interview Angles
- Explain the difference between Multer's multipart parsing, Cloudinary image storage, MongoDB metadata persistence, and Groq vision analysis.
- Walk through the seller upload and rider proof endpoints, including the file field names and validation boundary.
- Walk through state transitions from uploaded medicine image to approved listing.
- Explain how admin and rider roles contribute to trust and accountability.

## Skill: Source Files
- `client/src/pages/user/UploadMedicinePage.jsx`
- `client/src/api/medicineApi.js`
- `client/src/pages/rider/RiderConfirmCollectionPage.jsx`
- `client/src/api/riderApi.js`
- `server/src/middlewares/upload.middleware.js`
- `server/src/routes/medicine.routes.js`
- `server/src/routes/rider.routes.js`
- `server/src/controllers/medicine.controller.js`
- `server/src/controllers/rider.controller.js`
- `server/src/utils/cloudinary.helper.js`