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

## Podcast email subscriptions (Resend)

The homepage and podcast signup forms call `POST /api/subscribe` with `email`, optional `name`, and `show` (`value-created`, `anthropic-blogcast`, `money-mastered`, or `oc-pack`). The existing show-specific routes delegate to the same handler. The free Resend plan has three segments, so Money, Mastered and Anthropic Blogcast share the existing Money segment. Separate opt-out-by-default topics record each show's explicit signup choice. Value, Created and OC Pack keep their existing segments. Existing globally opted-out contacts are never resubscribed by these endpoints.

```env
RESEND_CONTACTS_API_KEY=your_resend_full_access_key
RESEND_API_KEY=your_resend_sending_key
RESEND_TOPIC_MONEY_MASTERED=931ed58a-f3bb-496c-a714-af9e28142d8a # optional override
RESEND_TOPIC_ANTHROPIC_BLOGCAST=a9b3ac5a-5a74-4ffb-aef7-6dcc84a4fa49 # optional override
```

- `RESEND_CONTACTS_API_KEY` must have Contacts access. When omitted, `RESEND_API_KEY` is used for Contacts too, so it must be a full-access key.
- `RESEND_API_KEY` sends one welcome email for a new show subscription. Contact storage works without it if `RESEND_CONTACTS_API_KEY` is set.
- `RESEND_TOPIC_MONEY_MASTERED` and `RESEND_TOPIC_ANTHROPIC_BLOGCAST` are optional overrides. The IDs above are the current topics and remain the defaults. Keep both topics' default subscription set to `opt_out`.
- `RESEND_SEGMENT_VALUE_CREATED`, `RESEND_SEGMENT_MONEY_MASTERED`, and `RESEND_SEGMENT_OC_PACK` are optional overrides. The current existing segment IDs remain the defaults. Anthropic uses `RESEND_SEGMENT_MONEY_MASTERED` too.
- Any future Money or Anthropic broadcast must specify its topic ID as well as the shared segment ID so only people opted into that show receive it.

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
