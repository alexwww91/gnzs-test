<?php

function request(string $host, string $uri, array $headers, array $options)
{
    $ch = curl_init($host . $uri);

    curl_setopt_array($ch, $options);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $content = curl_exec($ch);

    if ($content === false) {
        var_dump(curl_getinfo($ch));
    }
    $content = json_decode($content, true);

    curl_close($ch);
    return $content;
}

class amoCrmService
{

    private $token;
    private $base_domain;

    public function __construct($x_client_id)
    {
        $config = request('https://test.gnzs.ru', '/oauth/get-token.php', [
            'X-Client-Id: ' . $x_client_id
        ], [
            CURLOPT_HTTPGET => true,
        ]);
        $this->token = $config['access_token'];
        $this->base_domain = $config['base_domain'];
    }

    private function request(string $method, string $uri, $body = null)
    {
        $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . $this->token];
        $options = [];
        if ($method === 'get') {
            $options[CURLOPT_HTTPGET] = true;
        } elseif ($method === 'post') {
            $options[CURLOPT_POST] = true;
            if ($body) {
                $options[CURLOPT_POSTFIELDS] = json_encode($body);
            }
        }
        $response = request('https://' . $this->base_domain, $uri, $headers, $options);
        return $response;
    }

    public function getList($id)
    {
        return $this->request('get', '/api/v4/leads/' . $id);
    }

    public function addLeads($bod)
    {
        return $this->request('post', '/api/v4/leads', [$bod]);
    }

    public function addContacts($bod)
    {
        return $this->request('post', '/api/v4/contacts', [$bod]);
    }

    public function addCompanies($bod)
    {
        return $this->request('post', '/api/v4/companies', [$bod]);
    }
}
