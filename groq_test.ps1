# groq_test.ps1 — lê GROQ_API_KEY de .env e envia um pedido de teste
try {
    $line = Get-Content .env | Where-Object { $_ -like 'GROQ_API_KEY=*' } | Select-Object -First 1
    if (-not $line) { Write-Error 'GROQ_API_KEY not found in .env'; exit 2 }
    $key = $line -replace '^GROQ_API_KEY=' , ''

    $body = @{ 
        model = 'llama-3.1-8b-instant'
        messages = @(
            @{ role = 'system'; content = 'You are a helpful test agent.' },
            @{ role = 'user'; content = 'Diga Olá em português' }
        )
    } | ConvertTo-Json -Depth 10

    $headers = @{ Authorization = "Bearer $key"; 'Content-Type' = 'application/json' }

    $resp = Invoke-RestMethod -Uri 'https://api.groq.com/openai/v1/chat/completions' -Method Post -Headers $headers -Body $body -ErrorAction Stop
    $resp | ConvertTo-Json -Depth 10
} catch {
    Write-Error $_.Exception.Message
    exit 3
}
