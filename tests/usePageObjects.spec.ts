import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("navigate to form page", async ({ page }) => {
  const pm = new PageManager(page); // ทำการ initialize object of class การสร้างอินสแตนซ์ (วัตถุ) จากคลาส โดยใช้คำสั่ง new ซึ่งจะมี properties(ex.band) และ methods(ex.bmw) ตามที่กำหนดไว้ในคลาสนั้น และสามารถนำไปใช้งานต่อได้
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
  await pm.navigateTo().formLayoutsPage();
});

test.only("parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.firstName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Option 1"
    );
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      true
    );
  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerFromToday(1);
  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(5, 35);

  // console.log(dayjs().format("YYYY-MM-DD"));

  // await onDatepickPage.selectDatepickerWithRangeFromToday(5, 19)
});

test("testing with argos ci", async ({ page }) => {
  const pm = new PageManager(page); // ทำการ initialize object of class การสร้างอินสแตนซ์ (วัตถุ) จากคลาส โดยใช้คำสั่ง new ซึ่งจะมี properties(ex.band) และ methods(ex.bmw) ตามที่กำหนดไว้ในคลาสนั้น และสามารถนำไปใช้งานต่อได้
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datepickerPage();
});
