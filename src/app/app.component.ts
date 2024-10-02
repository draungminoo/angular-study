import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type OptionsType = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'This is title';
  body = 'this is body';
  doubleQuotes = 'This is Apple.';

  // In App Methods
  // #region

  // add two numbers
  addTwoNumbers(a: number, b: number) {
    return a + b;
  }

  /**
   * What this method do?
   * @param options OptionsType
   * @returns string
   */
  documentationTest(options: OptionsType) {
    return options.name;
  }

  // #endregion

  // Server Methods
  // #region

  /**
   * To take student data from the server.
   */
  getDataFromServer() {}

  getDataFromServer2() {}

  getDataFromServer3() {}

  getDataFromServer4() {}

  getDataFromServer5() {}

  getDataFromServer6() {}

  getDataFromServer7() {}

  // #endregion
}
