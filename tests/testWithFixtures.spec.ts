import { test } from "../test-options";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";

test.only("parametrized methods", async ({ pageManager }) => {
  const randomFullName = faker.person.firstName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  //   await pm.navigateTo().formLayoutsPage();
  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Option 1"
    );
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      true
    );
});
