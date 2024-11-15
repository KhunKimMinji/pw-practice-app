import { Page, expect } from "@playwright/test";
import dayjs from "dayjs";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }
  async selectCommonDatePickerFromToday(numberOfDayFromToday) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDayFromToday
    );
    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  private shouldSelectNextMonth(endDayFromToday: number): boolean {
    const today = dayjs();
    const endDate = dayjs().add(endDayFromToday, "day");
    const isShouldSelectNextMonth = today.isSame(endDate, "month"); // compare if same month
    console.log(today.toDate(), endDate.toDate(), endDayFromToday);
    return !isShouldSelectNextMonth;
  }

  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();

    const dateToAssertStart = await this.selectDateInTheCalendar(
      startDayFromToday
    );

    const shouldSelectNextMonth = this.shouldSelectNextMonth(endDayFromToday);
    console.log("shouldSelectNextMonth:", shouldSelectNextMonth);
    if (shouldSelectNextMonth) {
      // TODO: click Next month arrow if condition met
      const expectedDate = dayjs()
        .add(endDayFromToday, "day")
        .date()
        .toString();
      console.log("final:", expectedDate);
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      const locate = this.page
        .locator(".day-cell.ng-star-inserted")
        .getByText(expectedDate, { exact: true });
      console.log("locate:", locate);
      await this.page
        .locator(".day-cell.ng-star-inserted")
        .getByText(expectedDate, { exact: true })
        .nth(0)
        .click();
    } else {
      const dateToAssertEnd = await this.selectDateInTheCalendar(
        endDayFromToday
      );

      const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
      console.log(dateToAssert);

      await expect(calendarInputField).toHaveValue(dateToAssert);
    }
  }

  private async selectDateInTheCalendar(numberOfDayFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDayFromToday);
    const expetedDate = date.getDate().toString();
    // console.log("expecteddate", expetedDate);
    const expectedMonthShot = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expetedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expetedDate, { exact: true })
      .click();
    return dateToAssert;
  }
}
