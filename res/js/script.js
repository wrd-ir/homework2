$(function () {
    loadUserInfo()
        .then(function (user) {
            displayUserInfo(user)
        })
        .catch(function () {
            alert('Error loading user info')
        });

    $(".avatar").click(function () {
        $(".avatar-submenu").toggle();
    });

    if ($(location).attr('pathname') === '/index.html' || $(location).attr('pathname') === '/')
        $.get('https://private-anon-debd153d40-wad20postit.apiary-mock.com/posts', function (response) {
            for (post of response) {
                let div = $('<div class="post">')
                let author = $('<div class="post-author">').append(
                    $('<span class="post-author-info">').append(
                        $('<img>').attr('src', post.author.avatar)
                    ).append(
                        $('<small>').text(post.author.firstname + ' ' + post.author.lastname)
                    )
                ).append(
                    $('<small>').text(post.createTime)
                )
                let image = $('<div class="post-image">')
                if (post.media) {
                    if (post.media.type == 'image') {
                        image.append(
                            $('<img>').attr('src', post.media.url))
                    }
                    if (post.media.type == 'video') {
                        video = $('<video controls>').append(
                            $('<source type="video/mp4">').attr('src', post.media.url)
                        )
                        image.append(video)
                    }
                }
            
                let title = $('<div class="post-title">').append(
                    $('<h3>').text(post.text)
                )
                let actions = $('<div class="post-actions">').append(
                    $('<button type="button" name="like" class="like-button">').text(post.likes)
                )
                div.append(author)
                div.append(image)
                div.append(title)
                div.append(actions)
                //author:firstname, lastname, avatar
                //createTime //id //likes //media:type, url //text
                $('.main-container').append(div)
            }
        });
    if ($(location).attr('pathname').indexOf("browse.html") != -1)
        $.get('https://private-anon-debd153d40-wad20postit.apiary-mock.com/profiles', function (response) {
            for (post of response) {
                let div = $('<div class="account">')
                let image = $('<div class="account-image">')
                image.append(
                    $('<img>').attr('src', post.avatar))

                let title = $('<div class="account-title">').append(
                    $('<h3>').text(post.firstname + ' ' + post.lastname)
                )
                let actions = $('<div class="account-actions">').append(
                    $('<button type="button" name="follow" class="follow-button">').text('Followed')
                )
                div.append(image)
                div.append(title)
                div.append(actions)
                //firstname //lastname //avatar
                $('.main-container').append(div)
            }
        });

});

$(document).on('click', function (event) {
    if (!$(event.target).closest('.avatar').length) {
        $(".avatar-submenu").hide();
    }
});

$(document).on("click", "button[name='like']", function (event) {
    $(this).toggleClass("liked");
});

$(document).on("click", "button[name='follow']", function (event) {
    $(this).toggleClass("followed");
    $(this).text(($(this).text() == 'Followed') ? 'Follow' : 'Followed').fadeIn();
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