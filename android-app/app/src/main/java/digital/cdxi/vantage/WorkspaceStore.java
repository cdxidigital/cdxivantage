package digital.cdxi.vantage;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;

final class WorkspaceStore {
    private static final String PREFS = "vantage";
    private static final String KEY_URL = "workspace_url";

    private WorkspaceStore() {}

    static SharedPreferences prefs(Context context) {
        return context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    static String currentUrl(Context context) {
        String saved = prefs(context).getString(KEY_URL, "");
        if (saved != null && !saved.isEmpty()) return saved;
        String baked = BuildConfig.DEFAULT_URL;
        if (baked != null && !baked.isEmpty()) return baked;
        return "";
    }

    static void saveUrl(Context context, String url) {
        prefs(context).edit().putString(KEY_URL, url).apply();
    }

    static String normalize(String raw) {
        if (raw == null) return "";
        String value = raw.trim();
        if (value.isEmpty()) return "";
        if (!value.contains("://")) value = "https://" + value;
        Uri uri = Uri.parse(value);
        String scheme = uri.getScheme();
        if (scheme == null || !scheme.equalsIgnoreCase("https")) return "";
        if (uri.getHost() == null || uri.getHost().isEmpty()) return "";
        return value;
    }
}
