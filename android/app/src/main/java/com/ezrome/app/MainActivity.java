package com.ezrome.app;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

public class MainActivity extends Activity {
    private static final String START_URL = "https://id-preview-dff3bee7--fa041106-8c7e-4104-bd1f-2c1ad44723a8.lovable.app/projects";

    private WebView webView;
    private TextView errorView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        errorView = findViewById(R.id.error_view);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setSupportZoom(false);
        settings.setMediaPlaybackRequiresUserGesture(true);

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleNavigation(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleNavigation(Uri.parse(url));
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                showContent();
                injectProfessionalLinks();
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) {
                    showError();
                }
            }
        });

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            loadStartPage();
        }
    }

    private boolean handleNavigation(Uri uri) {
        if ("https".equalsIgnoreCase(uri.getScheme())) {
            return false;
        }
        if ("http".equalsIgnoreCase(uri.getScheme())) {
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            startActivity(intent);
        }
        return true;
    }

    /**
     * Adds the requested recruiter/social contact routes to the existing app page
     * without changing any of the portfolio or EZROME intelligence slides.
     */
    private void injectProfessionalLinks() {
        final String script = "javascript:(function(){"
                + "if(document.getElementById('ezrome-native-social-links'))return;"
                + "var s=document.createElement('section');"
                + "s.id='ezrome-native-social-links';"
                + "s.style.cssText='margin:24px auto;padding:18px;max-width:720px;border:1px solid rgba(34,211,238,.35);border-radius:10px;background:rgba(7,26,51,.82);font-family:system-ui,sans-serif;box-sizing:border-box;';"
                + "s.innerHTML='<div style=\"font-size:11px;letter-spacing:2px;color:#22d3ee;text-transform:uppercase;font-weight:700\">Professional contact</div>'"
                + "+'<div style=\"margin-top:6px;font-size:14px;color:#e5e7eb\">Connect with Sixolile Ezrome Mtyhali</div>'"
                + "+'<div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-top:14px\">'"
                + "+'<a href=\"https://www.linkedin.com/in/xillah-wethu-385aa63b4\" style=\"padding:10px;border:1px solid rgba(34,211,238,.4);border-radius:6px;color:#22d3ee;text-decoration:none;text-align:center;font-size:12px\">LinkedIn</a>'"
                + "+'<a href=\"https://x.com/XillahW37827\" style=\"padding:10px;border:1px solid rgba(34,211,238,.4);border-radius:6px;color:#22d3ee;text-decoration:none;text-align:center;font-size:12px\">X / Twitter</a>'"
                + "+'<a href=\"https://www.facebook.com/xillah.wethu.ii\" style=\"padding:10px;border:1px solid rgba(34,211,238,.4);border-radius:6px;color:#22d3ee;text-decoration:none;text-align:center;font-size:12px\">Facebook</a>'"
                + "+'<a href=\"https://www.instagram.com/xillahwethuii\" style=\"padding:10px;border:1px solid rgba(34,211,238,.4);border-radius:6px;color:#22d3ee;text-decoration:none;text-align:center;font-size:12px\">Instagram</a>'"
                + "+'<a href=\"https://wa.me/27691447275\" style=\"padding:10px;border:1px solid rgba(34,211,238,.4);border-radius:6px;color:#22d3ee;text-decoration:none;text-align:center;font-size:12px\">WhatsApp</a>'"
                + "+'<a href=\"mailto:xillahwethu87@gmail.com\" style=\"padding:10px;border:1px solid rgba(34,211,238,.4);border-radius:6px;color:#22d3ee;text-decoration:none;text-align:center;font-size:12px\">Email</a>'"
                + "+'</div>';"
                + "document.body.appendChild(s);"
                + "})()";
        webView.evaluateJavascript(script, null);
    }

    private void loadStartPage() {
        if (isOnline()) {
            showContent();
            webView.loadUrl(START_URL);
        } else {
            showError();
        }
    }

    private boolean isOnline() {
        ConnectivityManager manager = (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
        if (manager == null) return false;
        NetworkCapabilities capabilities = manager.getNetworkCapabilities(manager.getActiveNetwork());
        return capabilities != null && capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
    }

    private void showContent() {
        errorView.setVisibility(View.GONE);
        webView.setVisibility(View.VISIBLE);
    }

    private void showError() {
        webView.setVisibility(View.GONE);
        errorView.setVisibility(View.VISIBLE);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
        }
        super.onDestroy();
    }
}
