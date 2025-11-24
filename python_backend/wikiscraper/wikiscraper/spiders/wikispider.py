import scrapy
selected_currencies=["Bitcoin","Ripple","Ethereum","Tether","Solana"]
class WikiSpider(scrapy.Spider):
    name="wiki"
    start_urls=["https://en.wikipedia.org/wiki/List_of_cryptocurrencies"]
    def parse(self,response):
        table_entries=response.css("table.wikitable.sortable tbody tr")
        for entry in table_entries:
            name=entry.css("td a::text").get() or entry.css("td::text").get()
            if name in selected_currencies:
                currency_links=entry.css("td a::attr(href)").get()
                if currency_links:
                    yield response.follow("https://en.wikipedia.org/"+currency_links,self.page_parse)
    def page_parse(self,response):
        name=response.css("h1.firstHeading span::text").get()
        paragraphs=[]
        section_history=False
        for elem in response.css("div.mw-parser-output > *"):
            tag=elem.root.tag
            if tag=="h2":
                headline=elem.css("span.mw-heading::text").get()
                if headline and headline.strip()=="History":
                    section_history=True
                elif section_history:
                    break
                continue
            if tag=="p":
                paragraphs.append(" ".join(elem.css("::text").getall()).strip())
        yield {
            "name": name,
            "paragraphs": paragraphs,
            "url": response.url
        }
            
