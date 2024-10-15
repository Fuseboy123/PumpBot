document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            const publicKey = response.publicKey.toString();
            document.getElementById('walletAddress').innerText = publicKey;
            document.getElementById('walletInfo').classList.remove('hidden');

            fetch('https://pumpbot.lovestoblog.com/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wallet_address: publicKey })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('walletBalance').innerText = data.balance + ' credits';
            })
            .catch(err => console.error('Erro no registro:', err));
        } catch (err) {
            console.error('Erro ao conectar:', err);
        }
    } else {
        alert('Phantom Wallet não detectada!');
    }
});
