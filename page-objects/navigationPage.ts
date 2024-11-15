import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{
  // ts have OOP concept| export เพื่อให้คนอื่นเรียกใช้

  // readonly page: Page;
  // readonly fromLayoutMenuItem: Locator
  // readonly datePickerMenuItem: Locator
  // readonly smertTableMenuItem: Locator
  // readonly toastMenuItem: Locator
  // readonly tooltipMenuItem: Locator

  constructor(page: Page) {
    super(page)
    // this.page = page;
    // this.fromLayoutMenuItem = page.getByText('Form Layouts')
    // this.datePickerMenuItem = page.getByText('Datepicker')
    // this.smertTableMenuItem = page.getByText('Smart Table')
    // this.toastMenuItem = page.getByText('Toastr')
    // this.tooltipMenuItem = page.getByText('Tooltip')
  }

  async formLayoutsPage() {
    // async ใส่เพิ่อคำสั่งแรกทำเสร็จก่อนแล้วค่อยทำคำสั่งต่อไป
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText('Form Layouts').click()
    await this.waitForNumberOfseconds(2)
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText('Datepicker').click()
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText('Smart Table').click()
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText('Toastr').click()
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText('Tooltip').click()
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expanedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expanedState == "false") await groupMenuItem.click();
  }
}
