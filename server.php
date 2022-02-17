<?php
include 'config.php';

$action = $_POST['action'];

$service = new amoCrmService('30013801');
$body = [
    "title" => "Рандомное название",
];

if ($action == 'list-1') {
    $newLeads = $service->addLeads($body);
    $id = $newLeads["_embedded"]["leads"][0]["id"];
    $essence = "Новая сделка";
} elseif ($action == 'list-2') {
    $newContacts = $service->addContacts($body);
    $id = $newContacts["_embedded"]["contacts"][0]["id"];
    $essence = "Новый контакт";
} elseif ($action == 'list-3') {
    $newCompanies = $service->addCompanies($body);
    $id = $newCompanies["_embedded"]["companies"][0]["id"];
    $essence = "Новая компания";
};

echo json_encode([
    'id' => $id,
    'essence' => $essence
]);
