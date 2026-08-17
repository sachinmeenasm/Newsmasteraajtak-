const SUPABASE_URL = https://zdupxbndazidvwrfvrhd.supabase.co/storage/v1/object/public/News%20image/Screenshot_20260727_090728.jpg
const SUPABASE_KEY = sb_publishable_NSWujieJHbKrNORTwJa9oQ_HJvaqZdq

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadNewsPhoto() {
    const fileInput = document.getElementById("newsPhoto");
    const status = document.getElementById("uploadStatus");

    if (!fileInput.files.length) {
        status.textContent = "पहले फोटो चुनें।";
        return;
    }

    const file = fileInput.files[0];

    const fileName =
        Date.now() + "-" + file.name.replace(/\s+/g, "-");

    status.textContent = "फोटो upload हो रही है...";

    const { error } = await supabaseClient
        .storage
        .from("News image")
        .upload(fileName, file);

    if (error) {
        console.error(error);
        status.textContent = "Upload failed: " + error.message;
        return;
    }

    const { data } = supabaseClient
        .storage
        .from("News image")
        .getPublicUrl(fileName);

    status.textContent = "फोटो सफलतापूर्वक upload हो गई!";

    document.getElementById("photoPreview").src = data.publicUrl;
    document.getElementById("photoPreview").style.display = "block";

    console.log("Photo URL:", data.publicUrl);
}
