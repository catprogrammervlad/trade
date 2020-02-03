////////////// Functions //////////////

function addUser(login, password) {
  users.push([login, password, []]);
}

function choose_login_registration(statement) {
  if (statement == 'show') {
    $('.output').append(
      '<div class="choose"> <div class="choose__login">Login</div> <div class="choose__registration">Registration</div> </div>'
    );

    $('.choose__login').click(() => {
      choose_login_registration('remove');
      signin('show');
    });

    $('.choose__registration').click(() => {
      choose_login_registration('remove');
      registration('show');
    });

    console.log(users[0][2]);
  } else if (statement == 'remove') {
    $('.choose').remove();
  }
}

function registration(statement) {
  if (statement == 'show') {
    $('.output').append(
      ' <div class="form__registration"> <h1>Registration</h1> <p>Login</p> <input type="text" class="form__registration__input-login" /> <p>Password</p><input type="text" class="form__registration__input-password" /><p>Password again</p> <input type="text" class="form__registration__input-again" /><div class="registration__error"></div><button class= "form__registration-button" > Sign up!</button ></div > '
    );
    $('.form__registration-button').click(() => {
      let login = $('.form__registration__input-login').val();
      let password = $('.form__registration__input-password').val();
      let password_again = $('.form__registration__input-again').val();
      if (login == '') {
        $('.registration__error').css('color', 'red');
        $('.registration__error').text('Enter login!');
      } else if (password == '') {
        $('.registration__error').css('color', 'red');
        $('.registration__error').text('Enter password!!');
      } else if (password_again == '') {
        $('.registration__error').css('color', 'red');
        $('.registration__error').text('Enter password!!');
      } else if (password != password_again) {
        $('.registration__error').css('color', 'red');
        $('.registration__error').text('Passwords do not match');
      } else {
        $('.registration__error').css('color', 'green');
        $('.registration__error').text('123');

        addUser(login, password);

        console.log(users);
        registration('remove');
        choose_login_registration(statement);
      }
    });
  } else if (statement == 'remove') {
    $('.form__registration').remove();
  }
}

function signin(statement) {
  if (statement == 'show') {
    $('.output').append(
      '<div class="form__signin"> <h1>Sign in</h1> <p>Login</p> <input type="text" class="form__signin__input-login" /> <p>Password</p> <input type="text" class="form__signin__input-password" /> <button class="form__signin-button">Sign up!</button> <div class="signin__error"></div></div>'
    );

    $('.form__signin-button').click(() => {
      let login = $('.form__signin__input-login').val();
      let password = $('.form__signin__input-password').val();
      for (let i = 0; i < users.length; i++) {
        if (users[i][0] == login) {
          index_user_2 = i;
          break;
        }
      }

      user_check.push([login, password, users[index_user_2][2]]);
      console.log(user_check);
      if (users.toString().includes(user_check.toString())) {
        $('.signin__error').text('Success!');
        signin('remove');
        account('show');
      } else {
        $('.signin__error').text('Bad(');
        user_check = [];
      }
    });
  } else if (statement == 'remove') {
    $('.form__signin').remove();
  }
}

function account(statement) {
  if (statement == 'show') {
    $('.output').append(
      '<div class="account"> <div class="login">Hello, <em>catprogrammer</em>!</div> <div class="market">Market</div> <div class="create-trade">Create trade</div> <h3>Your items:</h3> <ol class="items"> </ol> <input class="input-item" type="text" /> <button class="add-item">Add item</button> <div class="account__exit">Exit</div> </div>'
    );
    for (let i = 0; i < users.length; i++) {
      if (users[i] == user_check.toString()) {
        index_user = i;
        break;
      }
    }
    $('.login em').text(users[index_user][0]);

    for (let i = 0; i < users[index_user][2].length; i++) {
      $('.items').append(`<li>${users[index_user][2][i]}</li>`);
    }

    $('.market').click(() => {
      account('remove');
      trade_area('show');
    });

    $('.create-trade').click(() => {
      account('remove');
      create_trade('show');
    });

    $('.add-item').click(() => {
      item = $('.input-item').val();
      users[index_user][2].push(item);
      $('.items').append(`<li>${item}</li>`);
      console.log(users);
    });

    $('.account__exit').click(() => {
      user_check = [];
      account('remove');
      choose_login_registration('show');
    });

    console.log(index_user);
  } else if (statement == 'remove') {
    $('.account').remove();
  }
}

function trade_area(statement) {
  if (statement == 'show') {
    $('.output').append(
      ' <div class="form__trade-area"> <div class="login">Hello, <em>Catprogrammer</em> !</div> <div class="account">Account</div>  </div>'
    );
    $('.login em').text(users[index_user][0]);

    $('.account').click(() => {
      trade_area('remove');
      account('show');
    });

    for (let i = 0; i < trade_list.length; i++) {
      $('.form__trade-area').append(
        '<div class="trade-area"><div class="give">Iphone</div> <div class="receive">1000 dollars</div> <button class="accept">Accept</button> <div class="seller">Seller: <em>VladVkus</em></div> <div class="trade-area_error-message"></div> </div>'
      );
    }

    $('.give').each(function(i) {
      $(this).addClass(' ' + i);
      $(this).text(trade_list[i][0]);
    });

    $('.receive').each(function(i) {
      $(this).addClass(' ' + i);
      $(this).text(trade_list[i][1]);
    });

    $('.accept').each(function(i) {
      $(this).addClass(' ' + i);
    });

    $('.trade-area_error-message').each(function(i) {
      $(this).addClass(' ' + i);
    });

    // Deleting .accept
    $('.accept').each(function(i) {
      if (user_check[0][0] == trade_list[i][2]) {
        $(this).remove();
      }
    });

    $('.seller em').each(function(i) {
      $(this).addClass(' ' + i);
      $(this).text(trade_list[i][2]);

      if (user_check[0][0] == trade_list[i][2]) {
        $(this).append(
          '<em style="color: green; margin-left: 10px">Is your offer</em>'
        );
      }
    });

    // index trade -> find index trade in `trade_list`
    // -> find index person in persons  -> find item in persons -> find item in person_check ->

    $('.accept').click(function() {
      let index_trade = $(this)
        .attr('class')
        .slice(-1);
      let name_seller = $('.seller .' + index_trade).text();
      let index_seller;
      for (let i = 0; i < users.length; i++) {
        if (users[i][0] == name_seller) {
          index_seller = i;
          break;
        }
      }
      let name_selling_item = $('.give.' + index_trade).text();
      let index_selling_item;
      for (let i = 0; i < users[index_seller][2].length; i++) {
        if (users[index_seller][2][i] == name_selling_item) {
          index_selling_item = i;
          break;
        }
      }
      let name_given_item = $('.receive.' + index_trade).text();
      let index_given_item;
      for (let i = 0; i < user_check[0][2].length; i++) {
        if (user_check[0][2][i] == name_given_item) {
          index_given_item = i;
          break;
        }
      }

      // process
      if (user_check[0][2][index_given_item] == undefined) {
        $('.trade-area_error-message.' + index_trade).text(
          `You don't have ${name_given_item}`
        );
      } else {
        let buffer_trade;
        buffer_trade = user_check[0][2][index_given_item];
        user_check[0][2][index_given_item] =
          users[index_seller][2][index_selling_item];
        users[index_seller][2][index_selling_item] = buffer_trade;

        // delete
        trade_list.splice(index_trade, 1);
        trade_area('remove');
        account('show');
      }
    });
  } else if (statement == 'remove') {
    $('.form__trade-area').remove();
  }
}

function create_trade(statement) {
  if (statement == 'show') {
    $('.output').append(
      ' <div class="form__create-trade"> <p>Give</p> <h2>catprogrammer</h2> <input class="give" type="text" /> <p>Receive</p> <input class="receive" type="text" /> <h3>Your items</h3> <ol> </ol> <div class="create-trade__create">Create!</div> <div class="account">Account</div><div class="error" style="color: red; margin:15px; font-size: 20px;"></div></div></div>'
    );
    $('h2').text(users[index_user][0]);
    $('.account').click(() => {
      create_trade('remove');
      account('show');
    });
    console.log(user_check);
    $('.create-trade__create').click(() => {
      give = $('.give').val();
      receive = $('.receive').val();
      if (users[index_user_2][2].includes(give)) {
        trade_list.push([give, receive, user_check[0][0]]);
        create_trade('remove');
        account('show');
      } else {
        $('.error').text('Your dont have this item!');
      }
    });

    for (let i = 0; i < users[index_user][2].length; i++) {
      $('ol').append(`<li>${users[index_user][2][i]}</li>`);
    }
  } else if (statement == 'remove') {
    $('.form__create-trade').remove();
  }
}

////////////// Statuses ///////////////

// if false than show registration block
let enter_status_stage_1 = false;

let enter_status_stage_2 = false;

////////////// Variables ///////////////

let index_user;
let index_user_2;

let item;

let give;
let receive;

////////////// Arrays ///////////////
const users = [
  ['1', '1', []],
  ['123', '123', []]
];

let user_check = [];

const trade_list = []; // give, receive, seller

////////////// Objects ///////////////

////////////// Programms ///////////////

if (enter_status_stage_1 == false) {
  choose_login_registration('show');
}
