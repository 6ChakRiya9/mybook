# 📚 របៀបថែមសៀវភៅថ្មី (ShelfControl)

## ជំហានទី 1 — ដាក់ File

| ប្រភេទ | ដាក់ក្នុង Folder | ឧទាហរណ៍ |
|---|---|---|
| រូបក្រប (cover) | `img/` | `img/mybook.png` |
| ឯកសារសៀវភៅ | `pdf/` | `pdf/my-book.pdf` |

> 💡 ដាក់ឈ្មោះ file ជាអក្សរតូច ហើយប្រើ `-` ជំនួសដកឃ្លា (ឧ. `my-book.pdf`)។
> ឈ្មោះដែលមានដកឃ្លា (ដូច `my cheese.png`) ប្រើបាន ប៉ុន្តែងាយមានបញ្ហា។

## ជំហានទី 2 — ថែម Code ក្នុង `library.html`

Copy កូដខាងក្រោម ហើយបិទ (paste) **មុន** `</div>` ចុងក្រោយនៃ `<div class="book-row">`
(នៅក្រោយកាតចុងក្រោយ)៖

```html
          <!-- Card 19 -->
          <article class="mini-book-card">
            <div class="card-cover">
              <a href="./pdf/my-book.pdf">
                <img src="./img/mybook.png" alt="ចំណងជើងសៀវភៅ" />
              </a>
            </div>
            <div class="card-info">
              <h3>ចំណងជើងសៀវភៅ</h3>
              <p class="author">By: ឈ្មោះអ្នកនិពន្ធ</p>
              <div class="card-footer">
                <span class="views">👁 0</span>
              </div>
            </div>
          </article>
```

ប្តូរតែ ៥ កន្លែងនេះ៖

1. `Card 19` → លេខកាតបន្ទាប់
2. `href="./pdf/my-book.pdf"` → ឈ្មោះ file PDF
3. `src="./img/mybook.png"` → ឈ្មោះ file រូប
4. `alt="..."` និង `<h3>...</h3>` → ចំណងជើងសៀវភៅ
5. `By: ...` → ឈ្មោះអ្នកនិពន្ធ

## ជំហានទី 3 — Push ទៅ GitHub

```bash
git add .
git commit -m "Add new book"
git push
```

## 👁 អំពីការរាប់ View និង Visitors

- រាប់ដោយ `counter.js` **ស្វ័យប្រវត្តិ** — មិនចាំបាច់សរសេរកូដបន្ថែមទេ។
- សៀវភៅនីមួយៗរាប់តាម **ចំណងជើងក្នុង `<h3>`**។
  ⚠️ បើប្តូរចំណងជើង លេខ view នឹងចាប់ផ្តើមពី 0 ឡើងវិញ។
- `👁 0` ក្នុង HTML ជាលេខចាប់ផ្តើម។ បើដាក់ `👁 100` វានឹងរាប់ 100 + ចំនួនចុចពិត។
- TOTAL VISITORS (ក្នុង `index.html`) ឡើង +1 រាល់ពេលបើកទំព័រ Home។
- ចង់ reset លេខទាំងអស់ទៅ 0៖ ប្តូរ `var NS = "shelfcontrol-6chakriya9-v2";`
  ក្នុង `counter.js` ទៅឈ្មោះថ្មី (ឧ. `-v3`)។
- ទំព័រថ្មីណាដែលចង់រាប់ ត្រូវមាន `<script src="./counter.js"></script>` នៅមុន `</body>`។
