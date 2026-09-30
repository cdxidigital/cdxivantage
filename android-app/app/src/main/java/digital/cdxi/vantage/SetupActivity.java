package digital.cdxi.vantage;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class SetupActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_setup);

        EditText field = findViewById(R.id.workspace_url);
        TextView error = findViewById(R.id.setup_error);
        Button open = findViewById(R.id.open_workspace);

        String existing = WorkspaceStore.currentUrl(this);
        if (!existing.isEmpty()) field.setText(existing);

        open.setOnClickListener((View v) -> {
            String normalized = WorkspaceStore.normalize(field.getText().toString());
            if (normalized.isEmpty()) {
                error.setText(R.string.setup_invalid);
                error.setVisibility(View.VISIBLE);
                return;
            }
            WorkspaceStore.saveUrl(this, normalized);
            Intent intent = new Intent(this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            finish();
        });
    }
}
