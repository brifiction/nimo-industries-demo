# nimo-industries-demo

What is this? This is a simple project for Nimo Industries, to showcase SST Ion (https://ion.sst.dev/docs) and developing a simple API service.

The third-party API service is CoinGecko API, to search for cryptocurrency details.

## Why create this?

To demonstrate why infrastructure-as-code frameworks are powerful & fast for DX.

And to highlight that you can do so much more with the SST Ion framework at the beginning, such as:

1. Add new AWS RDS Postgres instance, for your long-term (and permanent) datasource.
2. Add AWS SES for core mailing features, when ready to convert project to live environment.
3. Integrate Express / Fastify frameworks within SST Ion, to scale your API microservices.
4. Add API mock testing (such as `vitest`), with general unit testing for ALL your workspaces in the SST Ion project.
5. Enforce your environment variable management, with AWS Secrets Manager or using SST Ion's `Secret` feature.

The project design options are limitless.

## What does this project have?

To reduce significant costs, I am using the following AWS resources & third-party services.

### Third-party

1. Supabase `postgres`
2. CoinGecko API (demo account only)
3. MailTrap (for email sending/receiving tests)

### AWS

1. API Gateway
2. S3

### Libraries

1. drizzle-orm
2. node-mailer
3. uuid
4. node-fetch
5. postgres

## Getting started

First, you would need to configure your AWS CLI profile (assumed you have already set up a new AWS IAM user with access_key):

```bash
aws configure
```

Next, let's setup the project

```
pnpm i
pnpm sst version
```

### Setting up Drizzle migrations

For database migration, run the following commands below:

```bash
npx drizzle-kit generate
```

Then:

```bash
npx drizzle-kit migrate
npx drizzle-kit push
```

### Setting up secrets

Using SST's secret command feature, set up your environment variables below:

```bash
sst secret set ApiKey COINGECKO_API_KEY
sst secret set Drizzle POSTGRES_DB_CONNECTION_STRING
sst secret set MailSmtpHost SMTP_MAIL_HOST
sst secret set MailSmtpPort SMTP_MAIL_PORT
sst secret set MailUsername SMTP_MAIL_USERNAME
sst secret set MailPassword SMTP_MAIL_PASSWORD
```

> Don't forget to run `pnpm sst deploy` to push changes, SST CLI will remind you in the terminal.

Finally, let's see if it works on local:

```bash
pnpm sst dev
```

Or if you're ready, push it live:

```bash
pnpm sst deploy
```
