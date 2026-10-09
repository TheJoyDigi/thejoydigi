## TikTok Integration Environment Variables

### `TIKTOK_DEMO`

*   **Purpose**: Controls the behavior of the TikTok OAuth callback for demonstration and app review purposes.
*   **Values**:
    *   `true`: After a successful TikTok OAuth callback, the application will redirect to the `/tiktok-content` page. This page displays a list of demo videos with a mock "Share to TikTok" functionality, suitable for app review processes where live sharing is not required.
    *   `false` (or not set): After a successful TikTok OAuth callback, the application will redirect to the `/tiktok-tokens` page, which displays the obtained access and refresh tokens. This is the standard behavior.
*   **Usage**: This variable is read server-side in the `/api/tiktok/callback` API route.
*   **Example**:
    ```
    TIKTOK_DEMO=true
    ```

### `NEXT_PUBLIC_TIKTOK_CLIENT_KEY`

*   **Purpose**: Your TikTok application's Client Key.
*   **Values**: The actual client key provided by TikTok for your app.
*   **Usage**: Used both client-side (e.g., `tiktok-auth.tsx`) and server-side (e.g., `api/tiktok/callback.ts`). Must be prefixed with `NEXT_PUBLIC_` to be available on the client side.
*   **Example**:
    ```
    NEXT_PUBLIC_TIKTOK_CLIENT_KEY=your_actual_tiktok_client_key
    ```

### `TIKTOK_CLIENT_SECRET`

*   **Purpose**: Your TikTok application's Client Secret.
*   **Values**: The actual client secret provided by TikTok for your app.
*   **Usage**: Used server-side (e.g., `api/tiktok/callback.ts`) for exchanging the authorization code for an access token.
*   **Example**:
    ```
    TIKTOK_CLIENT_SECRET=your_actual_tiktok_client_secret
    ```

### `NEXT_PUBLIC_TIKTOK_SCOPES`

*   **Purpose**: Defines the permissions your application requests from TikTok.
*   **Values**: A comma-separated string of scopes (e.g., `user.info.basic,video.list`).
*   **Usage**: Used client-side (`tiktok-auth.tsx`) when initiating the authorization request. Must be prefixed with `NEXT_PUBLIC_`.
*   **Example**:
    ```
    NEXT_PUBLIC_TIKTOK_SCOPES=user.info.basic,video.upload
    ```

## Interest Topics Management (S3)

These variables configure the AWS S3 bucket used to store the `interests.json` file.

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your_bucket
INTERESTS_KEY=interests.json # optional
```

## Email list (Resend)

Every signup joins one Joy Digi list. The homepage and podcast signup forms call `POST /api/subscribe` with `email`, optional `name`, and an optional `interest` (`value-created`, `anthropic-blogcast`, `money-mastered`, or `oc-pack`; the older `show` field is still accepted). The interest only adds a line to the welcome email. The existing show-specific routes (`/api/<show>/subscribe`) delegate to the same handler with their show as the interest. Existing globally opted-out contacts are never resubscribed by these endpoints.

```env
RESEND_CONTACTS_API_KEY=your_resend_full_access_key
RESEND_API_KEY=your_resend_sending_key
RESEND_SEGMENT_JOY_DIGI=1f112a61-0dd0-454e-872a-0d731a143985 # optional override
```

- `RESEND_CONTACTS_API_KEY` must have Contacts access. When omitted, `RESEND_API_KEY` is used for Contacts too, so it must be a full-access key.
- `RESEND_API_KEY` sends one welcome email for a new subscription. Contact storage works without it if `RESEND_CONTACTS_API_KEY` is set.
- `RESEND_SEGMENT_JOY_DIGI` is optional. It defaults to the original Value, Created segment, so existing subscribers stay on the list and the Value, Created chapter emails keep targeting the same segment.
- The old per-show variables (`RESEND_SEGMENT_VALUE_CREATED`, `RESEND_SEGMENT_MONEY_MASTERED`, `RESEND_SEGMENT_OC_PACK`, `RESEND_TOPIC_MONEY_MASTERED`, `RESEND_TOPIC_ANTHROPIC_BLOGCAST`) are no longer read. Contacts already in the old Money, Mastered and OC Pack segments stay there; new signups go only to the Joy Digi segment.

## Value, Created chapter emails

The `value-created-email` GitHub Action checks the live feed after publication and hourly. Resend broadcast names prevent repeat sends. Keep both enable flags off until the physical mailing address, first chapter number, and shared secret are configured.

| Location | Name | Value |
| --- | --- | --- |
| Vercel production | `NEWSLETTER_POSTAL_ADDRESS` | The Joy Digi's physical street address or PO Box, shown in each chapter email |
| Vercel production | `VALUE_CHAPTER_FIRST_NUMBER` | First chapter to email, at least 15; set to the next unpublished chapter when enabling |
| Vercel production | `VALUE_CHAPTER_NOTIFY_SECRET` | A random secret of at least 32 characters |
| Vercel production | `VALUE_CHAPTER_EMAIL_ENABLED` | `true` when ready to send |
| GitHub Actions secret | `VALUE_CHAPTER_NOTIFY_SECRET` | The same secret as Vercel |
| GitHub Actions variable | `VALUE_CHAPTER_EMAIL_ENABLED` | `true` when ready to send |

`RESEND_CONTACTS_API_KEY` must also have Broadcasts access. First deploy the endpoint, set the Vercel values, then set the GitHub secret and enable variable. Choose `VALUE_CHAPTER_FIRST_NUMBER` from the live feed at activation; older chapters will not be emailed retroactively. To run immediately, dispatch the Action manually. Never use an email address as `NEWSLETTER_POSTAL_ADDRESS`.

Keep `VALUE_CHAPTER_NOTIFY_SECRET` limited to the serialized GitHub Action and the Vercel endpoint. Resend broadcast names dedupe retries, but concurrent direct calls to the endpoint are not an atomic lock.

## PostHog analytics

Tracking runs only on `thejoydigi.com` / `www.thejoydigi.com`; events go through the `/ingest` rewrite in `next.config.js`. Both variables are optional.

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_POSTHOG_KEY` | Overrides the project key hardcoded in `src/lib/analytics.ts` |
| `NEXT_PUBLIC_POSTHOG_LOCAL` | `1` to send events from localhost when testing (tagged `$host=localhost`) |

Visit any page with `?notrack=1` to stop tracking your own browser (`?notrack=0` turns it back on).
