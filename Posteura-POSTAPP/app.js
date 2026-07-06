var supabase = window.supabase.createClient('https://krfehxcloabvtbdxlzwy.supabase.co', 'sb_publishable_ViZdvxOYXLv__IAiizr_ng_k7zffPSM')
// console.log(supabase);
let edited = false;
let idindex = null;
let email;
let userId;
// let userName=user.user_metadata.first_name.ChatAt(0)
// console.log(userName);
window.onload = async function () {
    const posts = document.getElementById("posts");
    if (!posts) {
        console.log("posts div not found");
        return;
    }
    try {
        const { data, error } = await supabase
            .from("PostApp")
            .select("*")
            .order("id", { ascending: false });
        if (error) {
            console.log(error);
            return;
        }
        posts.innerHTML = "";
        data.forEach(post => {

            posts.innerHTML += `
            <div class="card m-3">
                <div class="card-header">Post:${post.id}: @${post.user_email}</div>
                <div class="card-body"
                style="background-image:url('${post.bg_img}');
                background-size:cover;">
                    <h5>${post.title}</h5>
                    <p>${post.description}</p>
                </div>
                <div class="ms-auto m-2">
             <button onclick="editPost(event,${post.id},'${post.description}','${post.title}','${post.bg_img}')" class="btn btn-success">Edit</button>
             <button onclick="deletePost(event,${post.id})" class="btn btn-danger">Delete</button>
             
            </div>
            `;
        });
       
    } catch (err) {
        console.log(err);
    }
    ;
}
async function searchbtn() {
    let searchInput = document.getElementById("searchInput").value;
    console.log(searchInput);
    try {
        const { data, error } = await supabase
            .from('PostApp')
            .select('*')
            .or(`title.ilike.%${searchInput}%,description.ilike.%${searchInput}%`)
        var posts = document.getElementById("posts")
        console.log(data);
        console.log(error);
        posts.innerHTML = ""
        data.forEach(post => {
            posts.innerHTML += `
    <div class="card mb-2">
             <div class="card-header">${post.id} ~Post</div>
             <div style="background-image:url(${post.bg_img})" class="card-body">
               <figure>
                 <blockquote class="blockquote">
                   <p>
                     ${post.title}
                   </p>
                 </blockquote>
                 <figcaption class="blockquote-footer">
                   ${post.description}
                 </figcaption>
               </figure>
             </div>
             <div class="ms-auto m-2">
             <button onclick="editPost(event,${post.id},'${post.description}','${post.title}','${post.bg_img}')" class="btn btn-success">Edit</button>
             <button onclick="deletePost(event,${post.id})" class="btn btn-danger">Delete</button>
             </div>
           </div>
   `})
        console.log(data);
        //   if(!data.length){
        //     posts.innerHTML= "No posts Found"
        if (data.length === 0) {
            posts.innerHTML = `
        <div class="not-found-card">
            <div class="search-icon">🔍</div>
            <h3>No Posts Found</h3>
            <p>No posts match "<b>${searchInput}</b>"</p>
            <button onclick="window.location.reload()" class="btn btn-primary">
                Show All Posts
            </button>
        </div>
    `;
            return;
        }
        if (error) console.log(error);
    } catch (error) {
        console.log(error);
    }
}
var cardBg = "";
function select(src, element) {
    cardBg = src;
    var images = document.getElementsByClassName("cardimg");
    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("select");
    }
    element.classList.add("select");
}
async function post() {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !description || !cardBg) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all fields and select an image!"
        });
        return;
    }
    try {
        let userName;
        const { data: { user } } = await supabase.auth.getUser();
         console.log(user.user_metadata.first_name);
        // 
        userName=user.user_metadata.first_name.chartAt(0)
        console.log(userName);
         console.log(userName);
        if (error) {
            console.log(error);
            return;
        }
        email = user.email;
         userId = user.id;
         
       
        if (edited) {

            const { error } = await supabase
                .from("PostApp")
                .update({
                    title: title,
                    description: description,
                    bg_img: cardBg
                })
                .eq("id", idindex);

            if (error) {
                console.log(error);
                return;
            }

            edited = false;
            idindex = null;

            Swal.fire({
                icon: "success",
                title: "Post Updated Successfully"
            });

        } else {

            const { error } = await supabase
                .from("PostApp")
                .insert({
                    title: title,
                    description: description,
                    bg_img: cardBg,
                    user_email: email,
                    user_id: userId
                });

            if (error) {
                console.log(error);
                return;
            }

            Swal.fire({
                icon: "success",
                title: "Post Added Successfully"
            });

        }

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        cardBg = "";

    } catch (error) {
        console.log(error);
    }
    //   location.reload()
}
async function deletePost(event, id) {
    console.log(event, id);
    try {
        const { data, error } = await supabase
            .from('PostApp')
            .delete()
            .eq('id', id)
        if (error) console.log(error);
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
    var card = event.target.parentNode.parentNode
    card.remove()
}

async function editPost(event, id, description, title, bg_img) {
      try {

    const { data: { user } } = await supabase.auth.getUser()
    console.log(user);
    userId = user.id
    console.log( user.id);
    
  } catch (error) {
    console.log(error);
  }
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;

    cardBg = bg_img;        
    edited = true;
    idindex = id;
    var images = document.getElementsByClassName("cardimg");
    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("select");
        if (images[i].src === bg_img) {
            images[i].classList.add("select");
        }
    }
}