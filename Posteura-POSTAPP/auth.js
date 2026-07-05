var supabase = window.supabase.createClient('https://krfehxcloabvtbdxlzwy.supabase.co', 'sb_publishable_ViZdvxOYXLv__IAiizr_ng_k7zffPSM')
console.log(supabase);
function clickHere(){
    window.location.href="login.html"
}
async function login() {

    const name = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        Swal.fire("Error", "Fill all fields", "error");
        return;
    }

    const { data, error } = await supabase.auth.signUp({

        email: email,

        password: password,

        options: {

            data: {

                username: name

            }

        }

    });

    if (error) {

        Swal.fire("Error", error.message, "error");

    } else {

        Swal.fire("Success", "Account Created Successfully", "success")
            .then(() => {

                location.href = "login.html";

            });

    }

}
async function loginanother() {

    const email = document.getElementById("email2").value;

    const password = document.getElementById("password2").value;

    if (!email || !password) {

        Swal.fire("Error", "Fill all fields", "error");

        return;

    }

    const { data, error } = await supabase.auth.signInWithPassword({

        email: email,

        password: password

    });

    if (error) {

        Swal.fire("Error", error.message, "error");

    } else {

        Swal.fire("Success", "Login Successful", "success")
            .then(() => {

                location.href = "home.html";

            });

    }

}
function signanother() {

    location.href = "signup.html";

}
// 
const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)

  if (event === 'INITIAL_SESSION') {
   if(!session)alert("Please create account firstly")
  } else if (event === 'SIGNED_IN') {
    alert("Successfully SignUp")
    location="home.html"
  } 
  
})

