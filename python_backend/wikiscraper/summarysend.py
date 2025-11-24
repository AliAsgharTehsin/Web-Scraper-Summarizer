from transformers import pipeline
import re,json
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def clean_text(text):
    text = re.sub(r"\[[^\]]*\]", "", text)       # remove citations
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"={2,}.*?={2,}", "", text)
    return text
def chunk_text(text,chunk_size=400,overlap=50):
    chunks=[]
    words=text.split()
    for i in range(0,len(words),chunk_size-overlap):
        chunk="".join(words[i:i+chunk_size])
        chunks.append(chunk)
        if i+chunk_size>len(words):
            break
    return chunks
def safe_summarize(text, summarizer,chunk_size,overlap):
    # Trim text so it doesn’t exceed model capacity
    chunks=chunk_text(text,chunk_size,overlap)
    summaries=[]
    for i,chunk in enumerate(chunks):

        try:
            summary = summarizer(
                chunk,
                max_length=200,
                min_length=80,
                do_sample=False
            )[0]["summary_text"]
            summaries.append(summary)
        except Exception as e:
            print("Error summarizing:", e)
            return ""
    if len(summaries)>0:
        summary="".join(summaries)
        return summary
    else:
        return summaries[0]
with open("/home/ali/Documents/CryptoScrapeProject/python_backend/wikiscraper/crypto_data.json") as f:
    data=json.load(f)
i=0
for datum in data:
    summary=datum.get("paragraphs","")
    if isinstance(summary, list):
        summary = " ".join(summary)
    clean_summary=clean_text(summary)
    print(f"Starting summarization of item {i}/{len(data)}...")
    final_summary=safe_summarize(summary,summarizer,400,50)
    datum["pararaphs"]=final_summary
    print(f"Finished summarization of item {i}/{len(data)}.\n")
    i+=1
with open("./crypto_data_summarized.json") as file:
    json.dump(data,file,indent=2)
