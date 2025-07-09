@RestController
public class AiController {

    private final String apiKey = "YOUR_HF_API_KEY";

    @PostMapping("/ask")
    public String askAI(@RequestParam String userInput) throws IOException {
        String url = "https://api-inference.huggingface.co/models/gpt2";
        HttpPost post = new HttpPost(url);
        post.setHeader("Authorization", "Bearer " + apiKey);
        post.setHeader("Content-Type", "application/json");

        StringEntity entity = new StringEntity("{\"inputs\": \"" + userInput + "\"}");
        post.setEntity(entity);

        try (CloseableHttpClient client = HttpClients.createDefault();
             CloseableHttpResponse response = client.execute(post)) {
            String result = EntityUtils.toString(response.getEntity());
            return result;
        }
    }
}
