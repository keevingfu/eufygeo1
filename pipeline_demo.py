import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

def run_pipeline(csv_path, output_prefix="ufi_demo"):
    # 1) 讀取 prompt_schema.csv
    df = pd.read_csv(csv_path)
    if "raw_text" not in df.columns:
        raise ValueError("CSV 必須包含 'raw_text' 欄位")

    # 2) 問題簇聚類 (KMeans over TF-IDF)
    texts = df["raw_text"].astype(str).tolist()
    n_clusters = min(5, max(1, len(texts)//2))  # 小樣本自適應
    vectorizer = TfidfVectorizer(max_features=500, stop_words="english")
    X = vectorizer.fit_transform(texts)
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    df["cluster_id"] = kmeans.fit_predict(X)

    # 3) GAP Score 計算 (簡化版：views+隨機)
    if "engagement_views" in df.columns:
        norm_views = (df["engagement_views"].fillna(0) - df["engagement_views"].min()) / (
            df["engagement_views"].max() - df["engagement_views"].min() + 1e-6
        )
    else:
        norm_views = np.random.rand(len(df))
    df["priority_score"] = (norm_views * 0.5 + np.random.rand(len(df)) * 0.5).round(2)

    # 4) YTRG 熱力圖 (聚類×來源)
    heatmap_path = None
    if "source_type" in df.columns:
        pivot = df.pivot_table(index="cluster_id", columns="source_type",
                               values="priority_score", aggfunc="mean", fill_value=0)
        plt.figure(figsize=(6,4))
        plt.imshow(pivot, cmap="viridis", aspect="auto")
        plt.colorbar(label="Priority Score")
        plt.xticks(range(len(pivot.columns)), pivot.columns, rotation=45)
        plt.yticks(range(len(pivot.index)), pivot.index)
        plt.title("YTRG Heatmap (cluster vs source)")
        plt.tight_layout()
        heatmap_path = f"{output_prefix}_ytrg_heatmap.png"
        plt.savefig(heatmap_path)
        plt.close()

    # 5) Rally 趨勢 (基於 captured_at)
    rally_path = None
    if "captured_at" in df.columns:
        df["captured_at"] = pd.to_datetime(df["captured_at"], errors="coerce")
        rally = df.groupby(df["captured_at"].dt.to_period("W"))["priority_score"].mean().reset_index()
        rally["captured_at"] = rally["captured_at"].astype(str)
        plt.figure(figsize=(6,4))
        plt.plot(rally["captured_at"], rally["priority_score"], marker="o")
        plt.xticks(rotation=45)
        plt.title("Rally Momentum Trend (weekly avg priority)")
        plt.tight_layout()
        rally_path = f"{output_prefix}_rally_trend.png"
        plt.savefig(rally_path)
        plt.close()

    # 6) FAQ 切片 Markdown
    faq_md = "# FAQ 切片（Demo）\n\n"
    for cid, group in df.groupby("cluster_id"):
        sample_q = group["raw_text"].iloc[0]
        avg_score = group["priority_score"].mean().round(2)
        faq_md += f"## 簇 {cid}\n"
        faq_md += f"- 代表問題: {sample_q}\n"
        faq_md += f"- 平均 GAP Score: {avg_score}\n"
        faq_md += f"- 推薦渠道: YouTube, Reddit\n\n"
    faq_path = f"{output_prefix}_faq.md"
    with open(faq_path, "w", encoding="utf-8") as f:
        f.write(faq_md)

    # 輸出結果
    df.to_csv(f"{output_prefix}_clustered.csv", index=False)
    return {
        "clustered_csv": f"{output_prefix}_clustered.csv",
        "heatmap": heatmap_path,
        "rally": rally_path,
        "faq_md": faq_path
    }

# 示例運行
if __name__ == "__main__":
    result = run_pipeline("prompt_schema.csv", output_prefix="demo")
    print(result)
