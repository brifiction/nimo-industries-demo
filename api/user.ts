import { db } from "../drizzle";
import { usersTable } from "../db/schema";
import { v4 as uuidv4 } from "uuid";
import { sendMail } from "./mail";

/**
 * Generate a unique token for API user.
 *
 */
export async function createUser() {
  try {
    const results = await db
      .insert(usersTable)
      .values({ token: uuidv4() })
      .returning({
        token: usersTable.token,
      });

    await sendMail(
      "crypto-user@test.com",
      "Receipt - Your API token",
      JSON.stringify(results, null, 2)
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Save the token! It will not be shown again.",
        results,
      }),
    };
  } catch (err) {
    console.error("error:" + err);
  }
}
