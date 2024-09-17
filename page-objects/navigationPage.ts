import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  // ts have concept OOP | export เพื่อให้คนอื่นเรียกใช้

  readonly page: Page;
  readonly fromLayoutMenuItem: Locator
  readonly datePickerMenuItem: Locator
  readonly smertTableMenuItem: Locator
  readonly toastMenuItem: Locator
  readonly tooltipMenuItem: Locator

  constructor(page: Page) {
    this.page = page;
    this.fromLayoutMenuItem = page.getByText('Form Layouts')
    this.datePickerMenuItem = page.getByText('Datepicker')
    this.smertTableMenuItem = page.getByText('Smart Table')
    this.toastMenuItem = page.getByText('Toastr')
    this.tooltipMenuItem = page.getByText('Tooltip')
  }

  async formLayoutsPage() {
    // async ใส่เพิ่อคำสั่งแรกทำเสร็จก่อนแล้วค่อยทำคำสั่งต่อไป
    await this.selectGroupMenuItem("Forms");
    await this.fromLayoutMenuItem.click();
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datePickerMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.smertTableMenuItem.click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expanedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expanedState == "false") await groupMenuItem.click();
  }
}
