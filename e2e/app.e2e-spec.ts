import { GeometryStuffPage } from './app.po';

describe('geometry-stuff App', function() {
  let page: GeometryStuffPage;

  beforeEach(() => {
    page = new GeometryStuffPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
