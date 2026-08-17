const SUPABASE_URL = "https://zdupxbndazidvwrfvrhd.supabase.co";
const SUPABASE_KEY = "sb_publishable_NSWujieJHbKrNORTwJa9oQ_HJvaqZdq";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function uploadNewsPhoto() {
  const fileInput = document.getElementById("newsPhoto");
  const status = document.getElementById("uploadStatus");
  const preview = document.getElementById("photoPreview");

  if (!fileInput.files || fileInput.files.length === 0) {
    status.textContent = "पहले फोटो चुनें।";
    return;
  }

  const file = fileInput.files[0];
  const fileName = Date.now() + "-" + file.name.replace(/\s+/g, "-");

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

  preview.src = data.publicUrl;
  preview.style.display = "block";
  status.textContent = "✅ फोटो सफलतापूर्वक upload हो गई!";
}
