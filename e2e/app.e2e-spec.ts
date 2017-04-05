import { AngSkeletonPage } from './app.po';

describe('ang-skeleton App', () => {
  let page: AngSkeletonPage;

  beforeEach(() => {
    page = new AngSkeletonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
