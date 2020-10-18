$(function () {
    $(".avatar").click(function() {
        var X = $(this).attr('id');
        if (X == 1) {
            $(".avatar-submenu").hide();
            $(this).attr('id', '0');
        }
        else
        {
            $(".avatar-submenu").show();
            $(this).attr('id', '1');
    }

    });

    loadUserInfo()
        .then(function (user) {
            displayUserInfo(user)
        })
        .catch(function () {
            alert('Error loading user info')
        });

});

function displayUserInfo(user) {
    $('#name').text(user.firstname + " " + user.lastname);
    $('#email').text(user.email );
}

function loadUserInfo() {
    return $.get(
        {
            url: 'https://private-anon-57e6ecddaf-wad20postit.apiary-mock.com/users/1',
            success: function (response) {
                return response;
            },
            error: function () {
                alert('error getting user information')
            }
        }
    );
}