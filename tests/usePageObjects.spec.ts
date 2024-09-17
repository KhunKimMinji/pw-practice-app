import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page); // ทำการ initialize object of class การสร้างอินสแตนซ์ (วัตถุ) จากคลาส โดยใช้คำสั่ง new ซึ่งจะมี properties(ex.band) และ methods(ex.bmw) ตามที่กำหนดไว้ในคลาสนั้น และสามารถนำไปใช้งานต่อได้
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastrPage();
  await navigateTo.tooltipPage();
});

test("parametrized methods", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);
  const onDatepickPage = new DatepickerPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialAndSelectOption(
    "test@test.com",
    "Welcome",
    "Option 1"
  );
  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    "Minji",
    "minji@test.com",
    true
  );
  await navigateTo.datepickerPage();
  await onDatepickPage.selectCommonDatePickerFromToday(1)
//   await onDatepickPage.selectDatepickerWithRangeFromToday(5, 16)

  await onDatepickPage.selectDatepickerWithRangeFromToday(5, 19)
});
